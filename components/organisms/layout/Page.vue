<template>
    <div class="layout--page">
        <LayoutHeader :icon="icon" :previous="previous" :title="title" />
        <slot />
        <ul v-if="actions && actions.length" class="layout--page--actions">
            <li v-for="action, index in actions" :key="`action--${index}`">
                <Button
                    :class="actionClasses(action)"
                    :title="action.title"

                    @click="action.action"

                    bigger padded round
                >
                    <font-awesome-icon v-if="action.icon" :icon="action.icon" />
                </Button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export interface Action {
    /**
     * Action click callback.
     */
    readonly action: (evt?: Event) => void;
    /**
     * Action button color.
     */
    readonly color: string | undefined;
    /**
     * Action button icon.
     */
    readonly icon: string | undefined;
    /**
     * Action button title.
     */
    readonly title: string | undefined;
}

export default Vue.extend({
    methods: {
        /**
         * Get action button classes.
         * 
         * @param action The action.
         * 
         * @return Button classes.
         */
        actionClasses(action: Action): string {
            const classes = ['action'];

            action.color && classes.push(`color-${action.color}`);

            return classes.join(' ');
        }
    },

    props: {
        /**
         * Page actions.
         */
        actions: Array,
        /**
         * Page icon.
         */
        icon: String,
        /**
         * Previous page.
         */
        previous: String,
        /**
         * Page title.
         */
        title: String,
    }
})
</script>