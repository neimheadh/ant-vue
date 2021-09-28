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

            this.redirect();
        },

        /**
         * Load the transaction account.
         */
        async loadAccount(): Promise<void> {
            this.loading = true;

            this.account = await this.$db.get(Account.TABLE, this.$route.params.account);
            this.transaction.account = this.account.uuid;

            this.loading = false;
        },

        /**
         * Redirect to previous page.
         * 
         * @param transaction The created transaction.
         */
        redirect(transaction?: any): void {
            if (transaction) {
                this.$router.replace(`/transaction/${transaction.uuid}/edit`);
            }
            this.$router.push(`/account/${this.account.uuid}`);
        },

        /**
         * Save account and go back.
         */
        submit(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            if((<any> this.$refs.form).checkValidity()) {
                this.$db.insert(Transaction.TABLE, this.transaction)
                    .then(this.redirect);
            }        
        }
    },

    data() {
        return {
            /**
             * Transaction account.
             */
            account: <any> undefined,

            /**
             * Loading status.
             */
            loading: true,

            /**
             * Transaction model.
             */
            transaction: <any> {
                balance: 0,
            },
        }
    },

    mounted() {
        this.loadAccount();
    },
})
</script>