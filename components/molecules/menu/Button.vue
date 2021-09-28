<template>
    <Button class="menu-button" :transparent="transparent" @click="click" bigger clickable primary square>
        <font-awesome-icon icon="bars" />
    </Button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        /**
         * Button classes.
         */
        classes(): string {
            const classes = ['menu-button'];

            this.transparent && classes.push('transparent');

            return classes.join(' ');
        }
    },
    methods: {
        /**
         * Handle button click.
         */
        click(evt: Event): void {
            evt.stopPropagation();
            evt.preventDefault();

            this.$events.dispatchEvent(new Event('menu.open'));
        },
    },
    props: {
        /**
         * Makes the button background transparent.
         */
        transparent: Boolean,
    }
})
</script>