<template>
    <Card class="account--form">
        <Form ref="form">
            <EditableText
                v-model="$data._account.name" 
                
                :label="$t('Account name')" 

                required
            />
            
            <EditableText   
                v-model="$data._account.type" 
                
                :label="$t('Account type')" 
            />
            
            <EditableEntity 
                v-model="$data._account.bank" 
                
                display-field="name" 
                
                :label="$t('Account bank')" 
                :table="Bank.TABLE" 

                @change="log($event, account.bank);"
            />
            
            <EditablePrice
                v-model="$data._account.balance" 
                
                :label="$t('Account balance')" 
            />
        </Form>
    </Card>
</template>

<script lang="ts">
import Vue from 'vue';

import Bank from '~/database/tables/Bank';

export default Vue.extend({
    methods: {
        log(...args: any): void {
            console.log(args);
        },

        /**
         * Check form validity.
         */
        checkValidity(): boolean {
            const form = <any> this.$refs.form;

            return form.checkValidity();
        }
    },

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