<template>
    <Panel
        @delete="onDelete"
        @edit="edit"

        class="account-panel" 
        ref="panel"
        deletable
        editable 
        focusable
    >
        <Title :level="3">{{ account.name }}</Title>
        <Title :level="4" v-if="bank">{{ bank.name }}</Title>
        <Price class="balance" :value="account.balance" :currency="account.currency" />
    </Panel>
</template>

<script lang="ts">
import Vue from 'vue'
import Account from '~/database/tables/Account';
import Bank from '~/database/tables/Bank';

export default Vue.extend({
    methods: {
        /**
         * Delete the account.
         */
        onDelete(): void {
            this.$db.delete(Account.TABLE, this.account.uuid);
        },

        /**
         * Edit the account.
         */
        edit(): void {

        },
    },
    props: {
        account: Object,
    },
    data: () => ({
        bank: <any> null,
    }),
    async mounted() {
        this.bank = this.account.bank && await this.$db.get(Bank.TABLE, this.account.bank);
    },
})
</script>