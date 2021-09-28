<template>
    <LayoutPage 
        :actions="[
            { action: cancel, color: 'secondary', icon: 'times', title: $t('Cancel') },
            { action: submit, color: 'success', icon: 'check', title: $t('Validate') }
        ]"
        :title="$t('New transaction')"
    >
        <Loading v-if="loading" />
        <TransactionForm v-else ref="form" :transaction="transaction" @submit="submit" />
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue';

import Account from '~/database/tables/Account';
import Transaction from '~/database/tables/Transaction';

export default Vue.extend({
    methods: {
        /**
         * Go back without saving.
         */
        cancel(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            this.redirect(this.transaction);
        },

        /**
         * Load the transaction account.
         */
        async loadTransaction(): Promise<void> {
            this.loading = true;

            this.transaction = await this.$db.get(Transaction.TABLE, this.$route.params.uuid);

            this.loading = false;
        },

        /**
         * Redirect to account page.
         * 
         * @param transaction The edited transaction.
         */
        redirect(transaction: any): void {
            this.$router.push(`/account/${transaction.account}`);
        },

        /**
         * Save account and go back.
         */
        submit(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            if((<any> this.$refs.form).checkValidity()) {
                this.$db.update(Transaction.TABLE, this.transaction)
                    .then(this.redirect);
            }        
        }
    },

    data() {
        return {
            /**
             * Loading status.
             */
            loading: true,

            /**
             * Transaction model.
             */
            transaction: <any> undefined,
        }
    },

    mounted() {
        this.loadTransaction();
    },
})
</script>