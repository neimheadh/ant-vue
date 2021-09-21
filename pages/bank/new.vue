<template>
    <PageNameEntityForm
        :name="$t('Bank')"
        :table="Bank.TABLE"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import Bank from '~/database/tables/Bank';

export default Vue.extend({
    data: () => ({
        Bank
    }),
})
</script>