<template>
    <div :class="classes()" ref="panel" @mousedown="mousedown" @mouseup="mouseup">
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import getTransitionDuration from '~/helpers/getTransitionDuration';
import { Action, ActionType } from '../organisms/layout/Actions.vue';
export default Vue.extend({
    data: () => ({
        editing: false,
        focusing: <NodeJS.Timeout | null> null,
        unfocusing: <NodeJS.Timeout | null> null,
    }),

    methods: {
        /**
         * Get panel actions.
         */
        actions(): Action[] {
            const actions: Action[] = [];

            if (this.editing) {
                this.editable && actions.push({type: ActionType.Cancel, callback: this.cancel});
                this.editable && actions.push({type: ActionType.Validate, callback: this.change});
            } else {
                this.deletable && actions.push({type: ActionType.Delete, callback: this.delete});
                this.editable && actions.push({type: ActionType.Edit, callback: this.edit});
            }

            return actions;
        },

        /**
         * Cancel change action.
         */
        cancel(evt?: Event): void {
            this.editing = false;
            this.$events.dispatchEvent(new Event('actions.unchange'));
            this.$emit('cancel-edit', evt);
        },

        /**
         * Change the panel content.
         */
        change(evt?: Event): void {
            this.editing = false;
            this.$events.dispatchEvent(new Event('actions.unchange'));
            this.$emit('change', evt);
        },

        /**
         * Get panel class list.
         */
        classes(): string {
            const classes: string[] = ['panel'];

            this.focused && classes.push('focused');

            return classes.join(' ');
        },

        /**
         * Delete the panel.
         */
        async delete(evt?: Event): Promise<Event | void> {
            const panel = <HTMLDivElement> this.$refs.panel;
            const transition = getTransitionDuration(panel, 'opacity');
            const promises = [
                this.unfocus(),
                new Promise(resolve => setTimeout(resolve, transition)),
            ];

            panel.classList.add('deleted');
            await Promise.all(promises);
            this.$emit('delete', evt);
            this.$el.remove();

            return Promise.resolve(evt);
        },

        /**
         * Edit the panel.
         */
        edit(evt?: Event) {
            this.editing = true;
            this.$events.dispatchEvent(new CustomEvent('actions.change', {detail: this.actions()}));
            this.$emit('edit', evt);
        },

        /**
         * Get the unfocus time.
         */
        getUnfocusTime(): number {
            const panel = <HTMLDivElement> this.$refs.panel;

            if (this.unfocusTime >= 0) {
                return this.unfocusTime;
            }

            return getTransitionDuration(panel);
        },
        
        /**
         * Handle mousedown event.
         */
        mousedown(evt?: Event): void {
            const panel = <HTMLDivElement> this.$refs.panel;
            this.$emit('mousedown', evt);

            evt?.stopPropagation();

            panel.style.left = `${panel.offsetLeft}px`;
            panel.style.top = `${panel.offsetTop}px`;
            this.focusable && !panel.classList.contains('focused') && this.focus();
        },

        /**
         * Handle mousedown event.
         */
        mouseup(evt?: Event): void {
            evt?.stopPropagation();
            this.$emit('mouseup', evt);

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
                const zone = document.createElement('div');
                const actions = this.actions();

                panel.classList.add('focused');

                zone.classList.add('panel-zone');
                zone.style.height = `${panel.clientHeight}px`;
                zone.style.width = `${panel.clientWidth}px`;
                panel.after(zone);

                this.$events.dispatchEvent(new CustomEvent('actions.change', {detail: actions}));

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
                        this.$emit('unfocus');
                        resolve();
                    }, this.getUnfocusTime());

                    this.$events.dispatchEvent(new Event('actions.unchange'));
                    this.editing && this.$events.dispatchEvent(new Event('actions.unchange'));
                    this.editing = false;
                    panel.classList.add('unfocusing');
                    this.$emit('unfocusing');
                });
            }

            return Promise.resolve();
        },
    },

    props: {
        /**
         * Makes the panel deletable.
         */
        deletable: Boolean,

        /**
         * Makes the panel editable.
         */
        editable: Boolean,

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