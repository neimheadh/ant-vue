<!--
    Layout header.
-->
<template>
    <header class="layout--header">
        <div class="container">
            <MenuButton />
            <Title v-if="title" :level="1">{{ title }}</Title>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        back(evt: Event) {
            evt.preventDefault();
            evt.stopPropagation();

            this.$router.push({path: this.previous});
        },
        home(evt: Event) {
            evt.preventDefault();
            evt.stopPropagation();

            if (this.$router.currentRoute.path !== '/') {
                this.$router.push({path: '/'});
            }
        }
    },
    props: {
        /**
         * Previous page path.
         */
        previous: String,
        /**
         * Page title.
         */
        title: String,
    },
})
</script>