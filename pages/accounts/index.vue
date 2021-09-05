<template>
    <LayoutPage :title="$t('Accounts')">
        <AccountPanel v-for="account in accounts" :key="account.uuid" :account="account" />
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
import Account from '~/database/tables/Account'
export default Vue.extend({
    data: () => ({
        accounts: <any[]> [],
    }),
    methods: {
        remove(account: any) {
            this.accounts = this.accounts.filter((candidate: any) => {
                return candidate.uuid !== account.uuid;
            });
        },
    },
    async mounted() {
        this.accounts = await this.$db.get(Account.TABLE);
    },
})
</script>