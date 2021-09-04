<template>
    <div class="list-panel">
        <Panel v-for="(panel, index) in panels" :key="index" :focused="focused.includes(index)" :focusable="focusable" @focus="focus($event, index)">
            <template v-for="attr in Object.keys(panel)" >
                <div v-if="isContent(attr)" :key="`${index}.content.${attr}`">
                    {{ panel[attr] }}
                </div>
            </template>
        </Panel>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        focused: <Number[]> [],
    }),
    methods: {
        focus(evt: Event, index: Number) {
            if (!this.multiFocusable) {
                this.focused = [];
            }

            this.focused.push(index);
            this.$emit('focus', evt);
        },
        isContent(attr: string) {
            return !this.contents || this.contents.includes(attr);
        }
    },
    props: {
        /**
         * What to display in content.
         */
        contents: Array,

        /**
         * Panels are focusable.
         */
        focusable: Boolean,

        /**
         * Can be multi-focused.
         */
        multiFocusable: {type: Boolean},

        /**
         * Panel list.
         */
        panels: Array,
    },
})
</script>