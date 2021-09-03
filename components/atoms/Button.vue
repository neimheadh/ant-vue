<template>
  <button ref="button" :class="classes().join(' ')" :type="type" @click="$emit('click', $event)"><slot /></button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    /**
     * Get button classes.
     */
    classes() {
      const classList = [];

      this.bigger && classList.push('bigger');
      this.clickable && classList.push('clickable');
      this.faded && classList.push('faded');
      this.inverted && classList.push('inverted');
      this.primary && classList.push('primary');
      this.rounded && classList.push('rounded');
      this.secondary && classList.push('secondary');
      this.square && classList.push('square');

      return classList;
    },
  },
  props: {
    /**
     * Bigger modifier.
     */
    bigger: {
      type: [Boolean],
    },

    /**
     * Clickable modifier.
     */
    clickable: {
      type: [Boolean],
    },

    /**
     * Faded modifier.
     */
    faded: {
      type: [Boolean],
    },

    /**
     * Inverted modifier.
     */
    inverted: {
      type: [Boolean],
    },

    /**
     * Primary modifier.
     */
    primary: {
      type: [Boolean],
    },

    /**
     * Rounded modifier.
     */
    rounded: {
      type: [Boolean],
    },

    /**
     * Secondary modifier.
     */
    secondary: {
      type: [Boolean],
    },

    /**
     * Square modifier.
     */
    square: {
      type: [Boolean],
    },

    /**
     * Button type.
     */
    type: {
      type: [String],
      default: 'button',
    }
  }
})
</script>