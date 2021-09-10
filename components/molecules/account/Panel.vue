<template>
    <Panel
        v-if="entity"

        @cancel-edit="editing = false"
        @change="change"
        @delete="remove"
        @edit="edit"
        @unfocusing="editing = false"

        class="account-panel" 
        ref="panel"

        deletable
        editable 
        focusable
    >
        <EditableText
            v-model="clone.name"

            :editing="editing"
            :label="$t('Account name')"
            :level="3"
            
            ref="name"
        />

        <EditableEntity
            v-model="clone.bank"

            :editing="editing"
            :label="$t('Account bank')"
            :level="4"
            :table="Bank.TABLE"

            display-field="name"
            ref="bank"
        />

        <EditablePrice
            v-model="clone.balance"
            
            :editing="editing"
            :label="$t('Account balance')"
            :currency="account.currency"
            
            ref="balance"
        />
    </Panel>
</template>

<script lang="ts">
import Vue from 'vue'
import Account from '~/database/tables/Account';
import Bank from '~/database/tables/Bank';

export default Vue.extend({
    methods: {
        /**
         * Handle account change.
         */
        change(): void {
            console.log(this.account.name);
            this.editing = false;

            this.entity = this.clone;
            this.clone = {...this.entity};
            this.$db.update(Account.TABLE, this.entity);
        },

        /**
         * Edit the account.
         */
        edit(): void {
            this.clone = {...this.entity};
            this.editing = true;
            console.log((<any> this.$refs.panel).editing);
            
            setTimeout(() => {
               (<any> this.$refs.name).focus();
            }, 10);
        },

        /**
         * Delete the account.
         */
        remove(): void {
            this.$db.delete(Account.TABLE, this.account.uuid);
        },
    },
    props: {
        /**
         * Panel account.
         */
        account: Object,
    },
    data: () => ({
        Bank,
        bank: <any> null,
        clone: <any> null,
        editing: false,
        entity: <any> null,
    }),
    async mounted() {
        this.entity = this.account;
        this.clone = {...this.entity};
        this.bank = this.account.bank && await this.$db.get(Bank.TABLE, this.account.bank);
    },
})
</script>