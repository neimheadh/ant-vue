<!--
    Layout header.
-->
<template>
    <header>
        <div class="container">
            <Button v-if="previous" class="btn-previous" @click="back" bigger clickable primary square>
                <font-awesome-icon icon="chevron-left" />
            </Button>
            <Button v-else class="btn-previous" @click="home" bigger clickable primary square>
                <font-awesome-icon icon="home" />
            </Button>
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