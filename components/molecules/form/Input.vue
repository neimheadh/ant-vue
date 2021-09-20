<template>
    <label class="form-input">
        <span>{{ label }}</span>

        <Input
            v-bind:value="value"

            ref="input"

            :placeholder="placeholder || label"
            :required="required"
            :title="title || label"
            :type="type"

            @input="$emit('input', $event)"
        />
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
            const valid = (<any> this.$refs.input).reportValidity();
            
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
         * Input placeholder.
         */
        placeholder: String,
        /**
         * Input required status.
         */
        required: Boolean,
        /**
         * Input title.
         */
        title: String,
        /**
         * Input type.
         */
        type: String,
        /**
         * Input value.
         */
        value: {},
    }
})
</script>