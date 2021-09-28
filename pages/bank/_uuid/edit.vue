<template>
    <Loading v-if="!bank" />
    <PageNameEntityForm
        v-else
        
        :entity="bank"
        :name="$t('Bank')"
        :table="Bank.TABLE"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import Bank from '~/database/tables/Bank';

export default Vue.extend({
    data() {
        return {
            Bank,
            bank: <any> undefined,
        };
    },
    async mounted() {
        this.bank = await this.$db.get(Bank.TABLE, this.$route.params.uuid);
    }
})
</script>