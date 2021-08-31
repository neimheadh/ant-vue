<template>
<div>
    <h1>Bank <code>{{ $route.params.uuid }}</code></h1>

    <p>
        <b>Name: </b> {{ bank && bank.name }}
    </p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Bank from '~/database/tables/Bank';

export default Vue.extend({
    data: () => ({
        bank: null,
    }),
    async mounted() {
        this.bank = await this.$db.get(Bank.TABLE, this.$route.params.uuid);
    }
})
</script>