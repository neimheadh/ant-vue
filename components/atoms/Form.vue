<template>
    <form>
        <slot />
    </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        /**
         * Check form validity.
         * 
         * It'll execute children having reportValidity function.
         */
        checkValidity(): boolean {
            const form = <HTMLFormElement> this.$el;

            for (const _child of this.$children) {
                const child = <any> _child;

                if (child.reportValidity !== undefined) {
                    child.reportValidity();
                }
            }

            return form.checkValidity();
        },

        /**
         * Copy of checkValidity().
         * 
         * Necessary for form in forms cascade validation.
         */
        reportValidity(): boolean {
            return this.checkValidity();
        }
    }
})
</script>