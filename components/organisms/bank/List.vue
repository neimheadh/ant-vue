<template>
    <div class="bank--list" ref="container">
        <Card
            v-for="bank in banks"

            class="clickable"

            @click="click($event, bank)"
            
            :key="bank.uuid"
        >
            <Title level="3">{{ bank.name }}</Title>
        </Card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Bank from '~/database/tables/Bank';
import CustomEvent from '~/events/CustomEvent';

export default Vue.extend({
    methods: {
        /**
         * Handle click event.
         */
        click(evt: Event, bank: any): void {
            const event = new CustomEvent('click', bank);
            
            evt.preventDefault();
            evt.stopPropagation();

            this.$emit('click', event);
        }
    },
    data() {
        return {
            banks: <any[]> [],
        }
    },
    async mounted() {
        this.banks = await this.$db.get(Bank.TABLE);
    },
})
</script>