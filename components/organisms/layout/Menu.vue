<template>
    <div class="menu">
        <div class="container" ref="container">
            <div class="content">
                <MenuLink to="/" @click="close">{{ $t('Home') }}</MenuLink>
                <MenuLink to="/accounts" @click="close">{{ $t('Accounts') }}</MenuLink>
            </div>
        </div>
        <Button class="btn-open" @click="toggle" bigger clickable primary square>
            <font-awesome-icon icon="bars" class="fa-bars" />
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
            const container = <HTMLDivElement> this.$refs.container;

            evt.stopPropagation();
            
            container.classList.remove('opened');
            this.$events.dispatchEvent(new Event('filler.close'));
        },
        /**
         * Toggle menu.
         */
        toggle(evt: Event) {
            const container = <HTMLDivElement> this.$refs.container;

            if (container.classList.contains('opened')) {
                this.close(evt);
            } else {
                this.open(evt);
            }
        },
        /**
         * Open menu.
         */
        open(evt: Event) {
            const container = <HTMLDivElement> this.$refs.container;

            evt.stopPropagation();

            container.classList.toggle('opened');
            this.$events.dispatchEvent(new Event('filler.open'));
        }
    },

    destroyed() {
        this.$events.removeEventListener('filler.closed', this.close);
    },

    mounted() {
        this.$events.addEventListener('filler.closed', this.close);
    },
})
</script>