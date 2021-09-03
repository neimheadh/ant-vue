<template>
    <div :class="classes()" ref="panel" @mousedown="mousedown">
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        focusing: <NodeJS.Timeout | null> null,
    }),

    methods: {
        /**
         * Get panel class list.
         */
        classes(): string {
            const classes: string[] = ['panel'];

            this.focused && classes.push('focused');

            return classes.join(' ');
        },
        
        /**
         * Handle mousedown event.
         */
        mousedown(evt: Event): void {
            evt.stopPropagation();

            this.focusable && this.focus(evt);
        },

        /**
         * Focus the element after a waiting time.
         */
        focus(evt: Event): void {
            this.focusing = setTimeout(() => {
                const panel = <HTMLDivElement> this.$refs.panel;

                panel.classList.add('focused');
                this.$emit('focus', evt);
            }, 1000);
        },

        /**
         * Unfocus an element.
         */
        unfocus(evt: Event): void {
            const panel = <HTMLDivElement> this.$refs.panel;

            this.focusing && clearTimeout(this.focusing);
            this.focusing = null;
            
            if (panel.classList.contains('focused')) {
                panel.classList.remove('focused');
                this.$emit('unfocus', evt);
            }
        },
    },

    props: {
        /**
         * Make the panel focusable.
         */
        focusable: {type: [Boolean]},

        /**
         * Make the panel focused.
         */
        focused: {type: [Boolean]},
    }
})
</script>