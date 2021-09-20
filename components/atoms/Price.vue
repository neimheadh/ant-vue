<template>
    <span :class="classes" ref="price">{{ price }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        classes(): string {
            const classes = ['price', `locale-${this.locales}`, `currency-${this.currency}`];
            const value = parseFloat(<string> this.value);

            value > 0 && classes.push('positive');
            value < 0 && classes.push('negative');
            value === 0 && classes.push('null');

            this.colored && classes.push('colored');
            this.invertedColor && classes.push('inverted-color');

            return classes.join(' ');
        },
        price(): string {
            return new Intl.NumberFormat(
                this.locales ?? this.$i18n.localeProperties.iso, 
                { style: 'currency', currency: this.currency}
            ).format(parseFloat(<string>this.value));
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
         * Invert negative/positive color.
         * 
         * Ignored if colored modifier off.
         */
        invertedColor: Boolean,
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
        value: {},
    }
})
</script>