<template>
    <h1 v-if="_level === 1"><slot /></h1>
    <h2 v-else-if="_level === 2"><slot /></h2>
    <h3 v-else-if="_level === 3"><slot /></h3>
    <h4 v-else-if="_level === 4"><slot /></h4>
    <h5 v-else><slot /></h5>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    computed: {
        /**
         * Title level -- parsed number.
         */
        _level(): number {
            return parseInt(`${this.level}`);
        }
    },

    props: {
        /**
         * Title H level.
         */
        level: {
            type: [Number, String],
        },
    },
})
</script>