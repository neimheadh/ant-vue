<template>
    <Card 
        class="card-price"

        @click="$emit('click', $event)"
        @focus="$emit('focus', $event)"
        @mouseup="$emit('mouseup', $event)"
        @mousedown="$emit('mousedown', $event)"
    >
        <Title v-if="title !== undefined" :level="titleLevel">{{ title }}</Title>
        <div><slot /></div>
        <Price v-if="price !== undefined" :currency="currency" :value="price" />
    </Card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        /**
         * Price currency.
         */
        currency: String,
        /**
         * Displayed price.
         */
        price: {},
        /**
         * Card title.
         */
        title: String,
        /**
         * The title level.
         */
        titleLevel: { type: Number, default: 3},
    },
});
</script>