<template>
    <div>
        <LayoutHeader :previous="previous" :title="title" />
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        /**
         * Previous page.
         */
        previous: String,
        /**
         * Page title.
         */
        title: String,
    }
})
</script>