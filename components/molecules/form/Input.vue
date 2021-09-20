<template>
    <label class="form-input">
        <span>{{ label }}</span>

        <Input
            v-bind:value="value"
            v-on:input="$emit('input', $event)"

            ref="input"

            :placeholder="placeholder || label"
            :title="title || label"
            :type="type"
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