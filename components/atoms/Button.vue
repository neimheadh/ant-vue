<template>
  <button :type="type" @click="$emit('click')"><slot /></button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
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