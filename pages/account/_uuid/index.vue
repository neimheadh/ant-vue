<template>
    <LayoutPage 
        v-if="account"

        :actions="[
            { action: createTransaction, color: 'primary', icon: 'plus', title: $t('Create transaction') },
        ]" 
    >
        <PageBanner>
            <Title level=2>{{ account.name }}</Title>
            <Title level=3>{{ account.type }} - {{ bank.name }}</Title>
            <Price :value="account.balance" />
        </PageBanner>
        <TransactionList
            :account="this.account.uuid"
        />
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
import Account from '~/database/tables/Account';
import Bank from '~/database/tables/Bank';
import Transaction from '~/database/tables/Transaction';
export default Vue.extend({
    methods: {
        /**
         * Create a transaction.
         */
        createTransaction(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            this.$router.push({path: `/transaction/new/${this.account.uuid}`});
        },
    },
    data() {
        return {
            Transaction,

            /**
             * The account.
             */
            account: <any> undefined,
            /**
             * The account bank.
             */
            bank: <any> {},
            /**
             * The account transactions.
             */
            transactions: <any[]> [],
        };
    },
    async mounted() {
        this.account = await this.$db.get(Account.TABLE, this.$route.params.uuid);
        this.account.bank && (this.bank = await this.$db.get(Bank.TABLE, this.account.bank));
    },
})
</script>