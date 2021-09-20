<template>
    <div class="editable-price">
        <FormInput
            v-if="editing"
            v-bind:value="value"
            
            type="number"
            
            :label="label"

            @error="$emit('error', $event)"
            @input="$emit('input', $event)"
        />
        <Price v-else :value="value" :currency="currency" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        /**
         * Check if the form is valid.
         */
        reportValidity(): boolean {
            return this.$refs.input && (<any> this.$refs.input).reportValidity();
        },
    },
    props: {
        /**
         * Price currency.
         */
        currency: String,
        /**
         * Editing status.
         */
        editing: { type: Boolean, default: true },
        /**
         * Input label.
         */
        label: String,
        /**
         * Input required status.
         */
        required: Boolean,
        /**
         * Input value.
         */
        value: {},
    },
})
</script>