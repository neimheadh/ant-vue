<template>
    <LayoutPage 
        :actions="[
            { action: cancel, color: 'secondary', icon: 'times', title: $t('Cancel') },
            { action: submit, color: 'success', icon: 'check', title: $t('Validate') }
        ]"
        :title="$t('New account')"
    >
        <AccountForm ref="form" :account="account" @submit="submit" />
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue';

import Account from '~/database/tables/Account';

export default Vue.extend({
    methods: {
        /**
         * Go back without saving.
         */
        cancel(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            this.$router.push('/account');
        },

        /**
         * Save account and go back.
         */
        submit(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            if((<any> this.$refs.form).checkValidity()) {
                this.$db.insert(Account.TABLE, this.account)
                    .then(() => this.$router.replace('/account'));
            }        
        }
    },

    data() {
        return {
            account: <any> {
                balance: 0,
            },
        }
    },
})
</script>