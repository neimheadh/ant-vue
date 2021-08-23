<template>
    <div>
        <h1>Accounts</h1>

        <Input v-model="name" />
        <Button @click="add()">Add</button>

        <ul>
            <li v-for="row in accounts" :key="row.uuid">
                {{ row.name }}
                <Button @click="remove(row)">x</Button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        accounts() {
            return this.$store.state.accounts.list;
        }
    },
    data: () => ({
        name: '',
    }),
    methods: {
        add() {
            this.$store.commit('accounts/add', { name: this.name });

            this.name = '';
        },
        remove(row) {
            this.$store.commit('accounts/remove', row);
        }
    }
})
</script>