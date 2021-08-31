<template>
    <textarea
        :type="type" 
        :placeholder="placeholder"

        v-bind:value="value"
        v-on:input="$emit('input', $event)"
    ></textarea>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * Input atom.
 */
export default Vue.extend({
  props: {
    /**
     * The input placeholder.
     */
    placeholder: {
      type: [String],
    },

    /**
     * The input default value.
     */
    value: {
      type: [Number, String],
    },
  }
})
</script>