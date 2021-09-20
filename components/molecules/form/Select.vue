<template>
    <label class="form-select">
        <span>{{ label }}</span>

        <Select
            v-bind:value="value"

            ref="input"

            :required="required"

            @input="$emit('input', $event.target.value)"
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
         * Check if the form is valid.
         */
        reportValidity(): boolean {
            const valid = (<HTMLSelectElement> this.$refs.input).reportValidity();

            if (valid) {
                this.$el.classList.remove('error');
            } else {
                this.$emit('error');
                this.$el.classList.add('error');
            }

            return valid;
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
         * Input required status.
         */
        required: Boolean,
        /**
         * Input value.
         */
        value: {},
    }
})
</script>