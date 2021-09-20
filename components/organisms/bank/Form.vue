<template>
    <Card class="bank--form">
        <Form ref="form" @submit="$emit('submit', $event)">
            <EditableText
                v-model="$data._bank.name" 

                ref="focus"
                
                :label="$t('Bank name')" 

                required
            />

            <input type="submit" class="hidden" />
        </Form>
    </Card>
</template>

<script lang="ts">
import Vue from 'vue';

import Bank from '~/database/tables/Bank';

export default Vue.extend({
    methods: {
        /**
         * Check form validity.
         */
        checkValidity(): boolean {
            return this._form.checkValidity();
        },
    },

    props: {
        /**
         * The bank.
         */
        bank: Object,
    },

    data() {
        return {
            Bank,

            _bank: <any> {},
            _form: <any> undefined,
        };
    },

    mounted() {
        if (this.bank !== undefined) {
            this.$data._bank = this.bank;
        }

        this._form = this.$refs.form;
        (<any> this.$refs.focus).focus();
    },
})
</script>