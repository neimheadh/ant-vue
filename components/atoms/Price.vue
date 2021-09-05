<template>
    <span :class="classes" ref="price">{{ price }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        classes(): string {
            const classes = ['price', `locale-${this.locales}`, `currency-${this.currency}`];

            this.value > 0 && classes.push('positive');
            this.value < 0 && classes.push('negative');
            this.value === 0 && classes.push('null');

            this.colored && classes.push('colored');

            return classes.join(' ');
        },
        price(): string {
            return new Intl.NumberFormat(
                this.locales ?? this.$i18n.localeProperties.iso, 
                { style: 'currency', currency: this.currency}
            ).format(this.value);
        }
    },
    props: {
        /**
         * Color the price.
         */
        colored: Boolean,
        /**
         * The price currency.
         */
        currency: {
            type: String,
            default: 'USD',
        },
        /**
         * The price locale.
         */
        locales: {
            type: String,
            default: undefined,
        },
        /**
         * Price value.
         */
        value: Number,
    }
})
</script>