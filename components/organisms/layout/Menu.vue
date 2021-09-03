<template>
    <div ref="layout" class="layout-menu" @click="close">
        <div class="container" @click="$event.stopPropagation()">
            <div class="content">
                <MenuLink to="/" @click="close">Home</MenuLink>
                <MenuLink to="/accounts" @click="close">Accounts</MenuLink>
            </div>
        </div>
        <Button class="btn-open" @click="toggle" bigger clickable faded primary rounded square>
            <font-awesome-icon icon="bars" class="fa-bars" />
            <font-awesome-icon icon="times" class="fa-times" />
        </Button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        /**
         * Close menu.
         */
        close(evt: Event) {
            const layout = <HTMLDivElement> this.$refs.layout;
            
            evt.stopPropagation();

            layout.classList.remove('opened');
        },
        /**
         * Toggle menu.
         */
        toggle(evt: Event) {
            const layout = <HTMLDivElement> this.$refs.layout;

            evt.stopPropagation();

            layout.classList.toggle('opened');
        },
    },
})
</script>