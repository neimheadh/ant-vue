<template>
    <div>
        <LayoutHeader :title="title" />
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        /**
         * Page title.
         */
        title: {
            type: [String],
        },
    }
})
</script>