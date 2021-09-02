<template>
    <div ref="layout" class="layout-menu" @click="close">
        <div class="content" @click="$event.stopPropagation()">
            <MenuLink to="/">Home</MenuLink>
            <MenuLink to="/accounts">Accounts</MenuLink>
            <Button class="btn-close" @click="close" clickable bigger square inverted faded>
                <font-awesome-icon icon="times" />
            </Button>
        </div>
        <Button class="btn-open" @click="toggle" clickable bigger square inverted>
            <font-awesome-icon icon="bars" />
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