<template>
    <div :class="classes" @click="click"></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        /**
         * Get component classes.
         */
        classes(): string {
            const classes = ['filler'];

            this.visible && classes.push('visible');

            return classes.join(' ');
        }
    },

    methods: {
        /**
         * Handle click event.
         */
        click(evt: Event): void {
            
            this.close();
        },
        /**
         * Makes filler invisible.
         */
        close(): void {
            if (this.visible) {
                this.visible = false;
                this.$events.dispatchEvent(new Event('filler.closed'));
            }
        },
        /**
         * Makes filler visible.
         */
        open(): void {
            if (!this.visible) {
                this.visible = true;
                this.$events.dispatchEvent(new Event('filler.opened'));
            }
        },
    },
    
    data: () => ({
       visible: false, 
    }),

    destroyed() {
        this.$events.removeEventListener('filler.open', this.open);
        this.$events.removeEventListener('filler.close', this.close);
    },
    
    mounted() {
        this.$events.addEventListener('filler.open', this.open);
        this.$events.addEventListener('filler.close', this.close);
    },
})
</script>