<template>
<div>
    <h1>Account <code>{{ $route.params.uuid }}</code></h1>

    <p>
        <b>Name: </b> {{ account && account.name }}
    </p>

    <p>
        <b>Balance: </b> {{ account && account.balance }}
    </p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Account from '~/database/tables/Account';

export default Vue.extend({
    data: () => ({
        account: null,
    }),
    async mounted() {
        this.account = await this.$db.get(Account.TABLE, this.$route.params.uuid);
    }    
})
</script>