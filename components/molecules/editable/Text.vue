<template>
    <div class="editable-text">
        <FormInput
            v-if="editing"
            v-bind:value="value"
            
            ref="input"

            :label="label"
            :required="required"

            @error="$emit('error', $event)"
            @input="$emit('input', $event)"
        />
        <Title v-else-if="level > 0" ref="name" :level="level">{{ value }}</Title>
        <template v-else>{{ value }}</template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        /**
         * Focus the text input.
         */
        focus(): void {
            (<any>this.$refs.input).focus();
        },
        /**
         * Check if the form is valid.
         */
        reportValidity(): boolean {
            return this.$refs.input && (<any> this.$refs.input).reportValidity();
        },
    },
    props: {
        /**
         * Editing status.
         */
        editing: { type: Boolean, default: true },
        /**
         * Input label.
         */
        label: String,
        /**
         * Title level.
         */
        level: { type: Number, default: 0 },
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