<template>
    <div :class="classes">
        <ul v-if="actions.length">
            <template v-for="(action, index) in actions[0]">
                <li v-if="action.type === ActionType.Cancel" :key="`action.${index}`">
                    <Button @click="action.callback" class="color-danger" bigger padded round>
                        <font-awesome-icon icon="times" />
                    </Button>
                </li>
                <li v-else-if="action.type === ActionType.Create" :key="`action.${index}`">
                    <Button @click="action.callback" class="color-primary" bigger padded round>
                        <font-awesome-icon icon="plus" />
                    </Button>
                </li>
                <li v-else-if="action.type === ActionType.Delete" :key="`action.${index}`">
                    <Button @click="action.callback" class="color-secondary" bigger padded round>
                        <font-awesome-icon icon="trash" />
                    </Button>
                </li>
                <li v-else-if="action.type === ActionType.Edit" :key="`action.${index}`">
                    <Button @click="action.callback" class="color-primary" bigger padded round>
                        <font-awesome-icon icon="pencil-alt" />
                    </Button>
                </li>
                <li v-else-if="action.type === ActionType.Validate" :key="`action.${index}`">
                    <Button @click="action.callback" class="color-success" bigger padded round>
                        <font-awesome-icon icon="check" />
                    </Button>
                </li>
                <li v-else :key="`action.${index}`">
                    <Button @click="action.callback" bigger padded round>
                        <font-awesome-icon icon="cogs" />
                    </Button>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * Action possible types.
 */
export enum ActionType {
    Default = 0,

    Cancel,
    Create,
    Delete,
    Edit,
    Validate,
}

/**
 * Action given to events.
 */
export interface Action {
    callback: Function,
    type?: ActionType,
}

export default Vue.extend({
    computed: {
        /**
         * Action classes.
         */
        classes(): string {
            const classes = ['actions'];

            return classes.join(' ');
        },
    },
    methods: {
        /**
         * Change current actions.
         */
        change(evt: CustomEvent): void {
            const stack: Action[] = evt.detail;

            this.validateActionStack(stack);
            this.actions.unshift(stack);
        },

        /**
         * Go back to the previous actions.
         */
        unchange(evt: CustomEvent): void {
            const stack: Action[] = evt.detail;

            this.validateActionStack(stack);
            this.actions.shift();
        },

        /**
         * Validate the action stack given by events.
         * 
         * @throws The action stack is invalid.
         */
        validateActionStack(stack: Action[]) {

            for (const a in stack) {
                const action = stack[a];

                if (action.callback === undefined) {
                    throw new Error(`Action ${a} does not have callback.`);
                }

                if (action.type && !Object.values(ActionType).includes(<ActionType> action.type)) {
                    throw new Error(`Wrong action type ${action.type} for action ${a}.`);
                }
            }
        }
    },
    data: () => ({
        ActionType,

        actions: <Action[][]> [],
    }),
    beforeDestroy() {
        this.$events.removeEventListener('actions.change', <(evt: Event) => void> this.change);
        this.$events.removeEventListener('actions.unchange', <(evt: Event) => void> this.unchange);
    },
    mounted() {
        this.$events.addEventListener('actions.change', <(evt: Event) => void> this.change);
        this.$events.addEventListener('actions.unchange', <(evt: Event)=> void> this.unchange);
    },
})
</script>