<template>
    <div class="title">
        <h1 v-if="level === 1"><slot /></h1>
        <h2 v-else-if="level === 2"><slot /></h2>
        <h3 v-else-if="level === 3"><slot /></h3>
        <h4 v-else-if="level === 4"><slot /></h4>
        <slot v-else />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        /**
         * Title H level.
         */
        level: {
            type: [Number],
            default: 0,
        },
    }
})
</script>