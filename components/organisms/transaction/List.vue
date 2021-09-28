<template>
    <div class="transaction-list">
        <Loading v-if="loading" />
        <template v-else>
            <div v-for="transactions, time in transactionList()" :key="`transactions-${time}`" class="transaction-list--element">
                <Fieldset>
                    <template v-slot:legend>
                        <Date :date="transactions[0].operation_date" locale="fr-FR" />
                    </template>
                    
                    <div 
                        v-for="transaction, index in transactions" 
                        @click="$router.push(`/transaction/${transaction.uuid}/edit`)" 
                        class="transaction-list--element" 
                        :key="`transactions-${time}-${index}`"
                    >
                        <div class="transaction-list--element--icon">
                            <font-awesome-icon v-if="transaction.icon" :icon="transaction.icon" />
                            <font-awesome-icon v-else icon="question" />
                        </div>
                        <div class="transaction-list--element--info">
                            <Title level="4">
                                <Entity :table="ThirdParty.TABLE" :uuid="transaction['third-party']" display-field="name" />
                            </Title>
                            <Title level="5">
                                {{ transaction.label }}
                            </Title>
                        </div>
                        <div class="transaction-list--element--price">
                            <Price :value="transaction.balance" />
                        </div>
                    </div>
                </Fieldset>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ThirdParty from '~/database/tables/ThirdParty';
import Transaction from '~/database/tables/Transaction';

export default Vue.extend({
    methods: {
        /**
         * Load transactions.
         */
        async loadTransactions(): Promise<void> {
            this.loading = true;

            this.transactions = this.account
                ? await this.$db.search(Transaction.TABLE, {account: this.account})
                : await this.$db.get(Transaction.TABLE);

            this.loading = false;
        },

        /**
         * Get the transaction list.
         */
        transactionList(): any {
            const transactions: any = {};

            for (const transaction of this.transactions) {
                const date = <Date> transaction.operation_date;
                const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                if (transactions[dateStr] === undefined) {
                    transactions[dateStr] = [];
                }

                transactions[dateStr].push(transaction);
            }

            console.log(transactions);

            return transactions;
        }
    },

    props: {
        /**
         * Transactions account uuid.
         */
        account: String,
    },

    data: () => ({
        ThirdParty,

        /**
         * Loading status.
         */
        loading: true,
        /**
         * Transactions list.
         */
        transactions: <any[]> [],
    }),

    mounted() {
        this.loadTransactions();
    },
})
</script>