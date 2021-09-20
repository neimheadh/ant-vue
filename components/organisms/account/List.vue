<template>
    <div class="account--list" ref="container">
        <CardPrice
            v-for="account in accounts"

            class="clickable"

            @click="click($event, account)"
            
            :content="account.type"
            :currency="account.currency"
            :key="account.uuid"
            :price="account.balance"
            :title="account.name"
        >
            <Title level="4">{{ account.type }}</Title>
        </CardPrice>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Account from '~/database/tables/Account';
import CustomEvent from '~/events/CustomEvent';

export default Vue.extend({
    methods: {
        /**
         * Handle click event.
         */
        click(evt: Event, account: any): void {
            const event = new CustomEvent('click', account);
            
            evt.preventDefault();
            evt.stopPropagation();

            this.$emit('click', event);
        }
    },
    data() {
        return {
            accounts: <any[]> [],
        }
    },
    async mounted() {
        this.accounts = await this.$db.get(Account.TABLE);
    },
})
</script>