<template>
    <Card class="account--form">
        <Form ref="form" @submit="$emit('submit', $event)">
            <EditableText
                v-model="$data._account.name" 

                ref="focus"
                
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

            <input type="submit" class="hidden" />
        </Form>
    </Card>
</template>

<script lang="ts">
import Vue from 'vue';
import Input from '~/components/atoms/Input.vue';

import Bank from '~/database/tables/Bank';

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

        (<any> this.$refs.focus).focus()
    },
})
</script>