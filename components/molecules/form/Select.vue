<template>
    <label class="form-select">
        <span>{{ label }}</span>

        <Select
            v-bind:value="value"
            v-on:input="$emit('input', $event)"

            ref="input"
        ><slot /></Select>
    </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        /**
         * Focus input.
         */
        focus(): void {
            (<any> this.$refs.input).focus();
        },
        /**
         * Select input content.
         */
        select(): void {
            (<any> this.$refs.input).select();
        },
    },
    props: {
        /**
         * Input label.
         */
        label: String,
        /**
         * Input value.
         */
        value: {},
    }
})
</script>