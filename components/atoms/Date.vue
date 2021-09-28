<template>
    <span class="date">
        {{ display }}
    </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        /**
         * The date display.
         */
        display(): string {
            const date = <Date> (<unknown> this.date);
            return new Intl.DateTimeFormat(this.locale).format(date);
        },
    },

    props: {
        /**
         * The date.
         */
        date: Date,

        /**
         * The date locale.
         */
        locale: {
            type: String,
            default: 'en-US',
        }
    },
})
</script>