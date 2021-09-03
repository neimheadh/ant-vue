<template>
    <Link class="menu-link" :href="to" @click="$emit('click', $event)"><slot /></Link>
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