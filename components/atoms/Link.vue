<template>
    <nuxt-link :to="href" :title="title"><slot /></nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        title: {
            type: [String]
        },
        href: {
            type: [String]
        },
    },
})
</script>