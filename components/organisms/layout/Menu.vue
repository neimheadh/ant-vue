<template>
    <div class="menu">
        <div ref="filler" class="filler" @click="close">
            <div class="container" @click="$event.stopPropagation()">
                <div class="content">
                    <MenuLink to="/" @click="close">{{ $t('Home') }}</MenuLink>
                    <MenuLink to="/accounts" @click="close">{{ $t('Accounts') }}</MenuLink>
                </div>
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
            const filler = <HTMLDivElement> this.$refs.filler;
            filler.classList.remove('opened');
        },
        /**
         * Toggle menu.
         */
        toggle(evt: Event) {
            const filler = <HTMLDivElement> this.$refs.filler;

            evt.stopPropagation();

            filler.classList.toggle('opened');
        },
    },
})
</script>