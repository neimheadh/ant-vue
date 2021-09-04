<template>
    <LayoutPage :title="$t('Accounts')">
        <Panel focusable>Account 1</Panel>
        <Panel focusable>Account 2</Panel>
        <Panel focusable>Account 3</Panel>
        <Panel focusable>Account 4</Panel>
        <Panel focusable>Account 5</Panel>
        <Panel focusable>Account 6</Panel>
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
import Account from '~/database/tables/Account'
export default Vue.extend({
    data: () => ({
        accounts: <any[]> [],
    }),
    async mounted() {
        this.accounts = await this.$db.get(Account.TABLE);
    },
})
</script>