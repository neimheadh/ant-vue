<template>
    <LayoutPage        
        :actions="[
            { action: remove, color: 'danger', icon: 'trash', title: $t('Delete') },
            { action: cancel, color: 'secondary', icon: 'times', title: $t('Cancel') },
            { action: submit, color: 'success', icon: 'check', title: $t('Validate') }
        ]"
        :title="$t('Edit bank', bank)"
    >
        <BankForm v-if="bank" ref="form" :bank="bank" />
        <Loading v-else />
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
import Bank from '~/database/tables/Bank';
export default Vue.extend({
    methods: {
        /**
         * Go back without saving.
         */
        cancel(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            this.$router.push('/bank');
        },

        /**
         * Save bank and go back.
         */
        submit(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            if((<any> this.$refs.form).checkValidity()) {
                this.$db.update(Bank.TABLE, this.bank)
                    .then(() => this.$router.push('/bank'));
            }
        },

        /**
         * Delete bank.
         */
        remove(evt: Event): void {
            evt.stopPropagation();
            evt.preventDefault();

            if (confirm(this.$t('Are you sure?').toString())) {
                this.$db.delete(Bank.TABLE, this.bank.uuid)
                    .then(() => this.$router.replace('/bank'));
            }
        },
    },
    
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