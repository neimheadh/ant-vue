<template>
    <LayoutPage
        :actions="[
            { action: remove, color: 'danger', icon: 'trash', title: $t('Delete') },
            { action: cancel, color: 'secondary', icon: 'times', title: $t('Cancel') },
            { action: submit, color: 'success', icon: 'check', title: $t('Validate') }
        ]"
        :title="$t('Edit account', account)"
    >
        <AccountForm v-if="account" ref="form" :account="account" @submit="submit" />
        <Loading v-else />
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
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
                this.$db.update(Account.TABLE, this.account)
                    .then(() => this.$router.push('/account'));
            }
        },

        /**
         * Delete account.
         */
        remove(evt: Event): void {
            evt.stopPropagation();
            evt.preventDefault();

            if (confirm(this.$t('Are you sure?').toString())) {
                this.$db.delete(Account.TABLE, this.account.uuid)
                    .then(() => this.$router.replace('/account'));
            }
        },
    },
    
    data() {
        return {
            account: <any> undefined,
        };
    },
    async mounted() {
        this.account = await this.$db.get(Account.TABLE, this.$route.params.uuid);
    }
})
</script>