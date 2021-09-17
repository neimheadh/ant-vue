<template>
    <div class="account--list" ref="container">
        <AccountPanel v-for="account in accounts" :key="account.uuid" :account="account" ref="panels" />
        <AccountPanel class="new-account" ref="new" @change="add" :focus-time="0" :unfocus-time="0" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Account from '~/database/tables/Account';
import { ActionType } from '~/components/organisms/layout/Actions.vue';

export default Vue.extend({
    methods: {
        add(entity: any): void {
            const newPanel = <any> this.$refs.new;
            newPanel.unfocus();
            newPanel.entity = {};

            this.accounts.push(entity);
        },
        create(): void {
            const newPanel = <any> this.$refs.new;
            newPanel.focus();
            newPanel.edit();
        },
        remove(account: any) {
            this.accounts = this.accounts.filter((candidate: any) => {
                return candidate.uuid !== account.uuid;
            });
        },
    },
    data() {
        return {
            accounts: <any[]> [],
            newAccount: <any> {},
        }
    },
    async mounted() {
        this.accounts = await this.$db.get(Account.TABLE);
        this.$events.dispatchEvent(new CustomEvent('actions.change', {detail: [
            { type: ActionType.Create, callback: this.create }
        ]}))
    },
})
</script>