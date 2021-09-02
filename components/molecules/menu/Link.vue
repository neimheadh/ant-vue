<template>
    <Link class="menu-link" :href="to"><slot /></Link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        to: {
            type: [String],
        }
    },
})
</script>