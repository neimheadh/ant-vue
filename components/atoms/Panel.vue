<template>
    <div :class="classes()" ref="panel" @mousedown="mousedown" @mouseup="mouseup">
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import getTransitionDuration from '~/helpers/getTransitionDuration';
export default Vue.extend({
    data: () => ({
        focusing: <NodeJS.Timeout | null> null,
        unfocusing: <NodeJS.Timeout | null> null,
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
         * Get the unfocus time.
         */
        getUnfocusTime(): number {
            const panel = <HTMLDivElement> this.$refs.panel;

            if (this.unfocusTime >= 0) {
                return this.unfocusTime;
            }

            return getTransitionDuration(panel) ?? 0;
        },
        
        /**
         * Handle mousedown event.
         */
        mousedown(evt?: Event): void {
            const panel = <HTMLDivElement> this.$refs.panel;
            evt?.stopPropagation();

            panel.style.left = `${panel.offsetLeft}px`;
            panel.style.top = `${panel.offsetTop}px`;
            this.focusable && this.focus();
        },

        /**
         * Handle mousedown event.
         */
        mouseup(evt?: Event): void {
            evt?.stopPropagation();

            this.focusing && clearTimeout(this.focusing);
            this.focusing = null;
        },

        /**
         * Focus the element after a waiting time.
         */
        focus(): void {
            this.unfocusing && clearTimeout(this.unfocusing);
            this.unfocusing = null;

            this.focusing = setTimeout(() => {
                const panel = <HTMLDivElement> this.$refs.panel;
                const height = panel.clientHeight;
                const width = panel.clientWidth;
                const zone = document.createElement('div');

                panel.classList.add('focused');

                zone.classList.add('panel-zone');
                zone.style.height = `${panel.clientHeight}px`;
                zone.style.width = `${panel.clientWidth}px`;
                panel.after(zone);

                this.$emit('focus');
                this.$events.addEventListener('filler.closed', this.unfocus);
                this.$events.dispatchEvent(new Event('filler.open'));
            }, this.focusTime);
        },

        /**
         * Unfocus an element.
         */
        unfocus(): Promise<void> {
            const panel = <HTMLDivElement> this.$refs.panel;

            this.focusing && clearTimeout(this.focusing);
            this.focusing = null;

            this.$events.removeEventListener('filler.closed', this.unfocus);
            
            if (panel && panel.classList.contains('focused')) {
                return new Promise(resolve => {
                    this.unfocusing = setTimeout(() => {
                        if (panel.nextElementSibling?.classList.contains('panel-zone')) {
                            panel.nextElementSibling.remove();
                        }
                        panel.classList.remove('focused');
                        panel.classList.remove('unfocusing');
                        this.$events.dispatchEvent(new Event('filler.close'));
                        resolve();
                    }, this.getUnfocusTime());
                    panel.classList.add('unfocusing');
                    this.$emit('unfocus');
                });
            }

            return Promise.resolve();
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

        /**
         * Seconds before the panel is focused
         * after the mousedown event.
         */
        focusTime: {
            type: [Number],
            default: 1000,
        },

        /**
         * Un-focussing time bedore removignthe 'focused' class.
         * 
         * If under 0, will be ignored in order to take the first transition
         * speed, if any.
         */
        unfocusTime: {
            type: [Number],
            default: -1,
        },
    }
})
</script>