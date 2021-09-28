<template>
    <Card class="account--form">
        <Form ref="form" @submit="$emit('submit', $event)">
            <EditableText
                v-model="$data._transaction.label" 

                ref="focus"
                
                :label="$t('Transaction name')" 

                required
            />
            
            <EditableEntity 
                v-model="$data._transaction.account" 
                
                display-field="name" 
                
                :label="$t('Transaction account')" 
                :table="Account.TABLE"
            />

            <EditableEntity
                v-model="$data._transaction['third-party']"

                display-field="name"

                :label="$t('Transaction third party')"
                :table="ThirdParty.TABLE"
            />
            
            <EditablePrice
                v-model="$data._transaction.balance" 
                
                :label="$t('Transaction balance')" 
            />

            <input type="submit" class="hidden" />
        </Form>
    </Card>
</template>

<script lang="ts">
import Vue from 'vue';
import Input from '~/components/atoms/Input.vue';

import Account from '~/database/tables/Account';
import ThirdParty from '~/database/tables/ThirdParty';

export default Vue.extend({
  components: { Input },
    methods: {
        /**
         * Check form validity.
         */
        checkValidity(): boolean {
            const form = <any> this.$refs.form;

            return form && form.checkValidity();
        },

        submit(evt: Event): void {
            console.log('submit', evt);
            evt.preventDefault();
        },
    },

    props: {
        /**
         * The account.
         */
        transaction: Object,
    },

    data() {
        return {
            Account,
            ThirdParty,

            _transaction: <any> {},
        };
    },

    mounted() {
        if (this.transaction !== undefined) {
            this.$data._transaction = this.transaction;
        }

        (<any> this.$refs.focus).focus()
    },
})
</script>