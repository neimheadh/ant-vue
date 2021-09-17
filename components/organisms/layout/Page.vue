<template>
    <div class="layout--page">
        <LayoutHeader :icon="icon" :previous="previous" :title="title" />
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        /**
         * Page icon.
         */
        icon: String,
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