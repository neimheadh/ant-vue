<template>
  <button 
    ref="button" 
    
    :class="classes().join(' ')" 
    :type="type" 
    
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

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
      this.padded && classList.push('padded');
      this.primary && classList.push('primary');
      this.round && classList.push('round');
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
    bigger: Boolean,

    /**
     * Clickable modifier.
     */
    clickable: Boolean,

    /**
     * Faded modifier.
     */
    faded: Boolean,

    /**
     * Inverted modifier.
     */
    inverted: Boolean,

    /**
     * Add padding to the button.
     */
    padded: Boolean,

    /**
     * Primary modifier.
     */
    primary: Boolean,

    /**
     * Makes the button round.
     */
    round: Boolean,

    /**
     * Rounded modifier.
     */
    rounded: Boolean,

    /**
     * Secondary modifier.
     */
    secondary: Boolean,

    /**
     * Square modifier.
     */
    square: Boolean,

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