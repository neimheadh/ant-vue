<template>
    <LayoutPage v-if="bank" previous="/bank" title="Bank">
        {{ bank.name }}
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
import Bank from '~/database/tables/Bank';
export default Vue.extend({
    data() {
        return {
            bank: <any> undefined,
        };
    },
    async mounted() {
        this.bank = await this.$db.get(Bank.TABLE, this.$route.params.uuid);
    }
})
</script>