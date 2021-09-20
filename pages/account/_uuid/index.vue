<template>
    <LayoutPage v-if="account" previous="/account" title="Account">
        {{ account.name }}
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
import Account from '~/database/tables/Account';
export default Vue.extend({
    data() {
        return {
            account: <any> undefined,
        };
    },
    async mounted() {
        this.account = await this.$db.get(Account.TABLE, this.$route.params.uuid);
    }
})
</script>