<template>
    <Card class="account--form">
        <EditableText   v-model="$data._account.name" :label="$t('Account name')" />
        <EditableText   v-model="$data._account.type" :label="$t('Account type')" />
        <EditableEntity v-model="$data._account.bank" display-field="name" :label="$t('Account bank')" :table="Bank.TABLE" />
        <EditablePrice  v-model="$data._account.balance" :label="$t('Account balance')" />
    </Card>
</template>

<script lang="ts">
import Vue from 'vue';

import Bank from '~/database/tables/Bank';

export default Vue.extend({
    props: {
        /**
         * The account.
         */
        account: Object,
    },

    data() {
        return {
            Bank,

            _account: <any> {},
        };
    },

    mounted() {
        if (this.account !== undefined) {
            this.$data._account = this.account;
        }
    },
})
</script>