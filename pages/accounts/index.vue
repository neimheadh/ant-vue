<template>
    <div>
        <h1>Accounts</h1>

        <Input v-model="name" />
        <Button @click="add()">Add</button>

        <ul>
            <li v-for="account in accounts" :key="account.uuid">
                <nuxt-link :to="`/accounts/${account.uuid}`">{{ account.uuid }}</nuxt-link> - {{ account.name }} - {{ account.balance }}
                <Button @click="remove(account.uuid)">x</Button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '~/components/atoms/Button.vue';
import Account from '~/database/tables/Account'

export default Vue.extend({
  components: { Button },
    methods: {
        async add() {
            await this.$db.insert(Account.TABLE, {
                name: this.name.toString(),
                balance: 0,
            });

            this.name = '';

            this.accounts = await this.getAccounts();
        },
        async remove(uuid: string) {
            await this.$db.delete(Account.TABLE, uuid);
            this.accounts = await this.getAccounts();
        },
        async getAccounts() {
            return this.$db.get(Account.TABLE);
        },
    },
    data: () => ({
        accounts: <any[]> [],
        name: '',
    }),
    async mounted() {
        this.accounts = await this.getAccounts();
    }
})
</script>