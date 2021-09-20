<!--
    Card atom.

    events:
        - click: Mouse click.
        - focus: Card focused (click hold during 2s.)
        - mousedown: Mouse-down event.
        - mouseup: Mouse-up event.
-->
<template>
    <div 
        class="card"

        @click="click"
        @mousedown="mousedown"
        @mouseup="mouseup"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        /**
         * Handle click event.
         */
        click(evt: Event): void {
            this.$emit('click', evt);
        },
        /**
         * Handle mousedown event.
         */
        mousedown(evt: Event): void {
            this.$emit('mousedown', evt);

            this.focusTimeout && clearTimeout(this.focusTimeout);
            this.focusTimeout = null;

            setTimeout(() => {
                this.$emit('focus');
            }, this.focusDelay);
        },
        /**
         * Handle mouseup event.
         */
        mouseup(evt: Event): void {
            this.focusTimeout && clearTimeout(this.focusTimeout);
            this.focusTimeout = null;

            this.$emit('mouseup', evt);
        }
    },

    props: {
        /**
         * Time between the mousedown and the
         * focus.
         */
        focusDelay: {type: Number, default: 2000},  
    },

    data() {
        return {
            /**
             * True if the card is focused.
             */
            focused: false,
            /**
             * The focusing timeout.
             */
            focusTimeout: <NodeJS.Timeout | null> null,
        };
    },
});
</script>