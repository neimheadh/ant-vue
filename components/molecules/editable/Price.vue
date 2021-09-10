<template>
    <div class="editable-price">
        <FormInput
            v-if="editing"
            v-bind:value="value"
            v-on:input="$emit('input', $event)"
            type="number"
            :label="label"
        />
        <Price v-else :value="value" :currency="currency" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        /**
         * Price currency.
         */
        currency: String,
        /**
         * Editing status.
         */
        editing: { type: Boolean, default: false },
        /**
         * Input label.
         */
        label: String,
        /**
         * Input value.
         */
        value: {},
    },
})
</script>