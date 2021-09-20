<template>
    <LayoutPage 
        :actions="[
            { action: cancel, color: 'secondary', icon: 'times', title: $t('Cancel') },
            { action: submit, color: 'success', icon: 'check', title: $t('Validate') }
        ]"
        :title="$t('New bank')"
    >
        <BankForm ref="form" :bank="bank" />
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue';

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
                this.$db.insert(Bank.TABLE, this.bank)
                    .then(() => this.$router.replace('/bank'));
            }        
        }
    },

    data() {
        return {
            bank: <any> {
                balance: 0,
            },
        }
    },
})
</script>