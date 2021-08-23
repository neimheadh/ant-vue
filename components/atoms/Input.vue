<template>
  <input 
    :type="type" 
    :placeholder="placeholder"

    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: [String],
      default: 'text',
    },
    value: {
      default: '',
    },
    placeholder: {
      type: [String],
      default: '',
    }
  }
})
</script>