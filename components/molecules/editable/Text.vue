<template>
    <div class="editable-text">
        <FormInput
            v-if="editing"
            v-bind:value="value"
            v-on:input="$emit('input', $event)"
            :label="label"
        />
        <Title v-else-if="level > 0" ref="name" :level="level">{{ value }}</Title>
        <template v-else>{{ title }}</template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        /**
         * Editing status.
         */
        editing: { type: Boolean, default: false },
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