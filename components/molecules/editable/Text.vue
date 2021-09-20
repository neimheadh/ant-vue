<template>
    <div class="editable-text">
        <FormInput
            v-if="editing"
            v-bind:value="value"
            v-on:input="$emit('input', $event)"
            ref="input"
            :label="label"
        />
        <Title v-else-if="level > 0" ref="name" :level="level">{{ value }}</Title>
        <template v-else>{{ value }}</template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        focus(): void {
            (<any>this.$refs.input).focus();
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
         * Input value.
         */
        value: {},
    },
})
</script>