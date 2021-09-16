<!--
    Account panel.
-->
<template>
    <Panel
        v-if="entity"

        :class="classes()"
        :focus-time="focusTime"
        :focused="focused"
        :unfocus-time="unfocusTime"

        @cancel-edit="editing = false"
        @change="change"
        @click="click"
        @delete="remove"
        @edit="onEdit"
        @unfocusing="editing = false"

        class="account-panel" 
        ref="panel"

        clickeable
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
            :currency="entity.currency"
            
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
         * Get CSS classes.
         */
        classes(): string {
            const classes = ['account-panel'];

            this.error && classes.push('error');

            return classes.join(' ');
        },

        /**
         * Handle click event.
         */
        click(): void {
            this.$router.push({
                path: `/account/${this.account.uuid}`,
            });
        },

        /**
         * Handle account change.
         */
        change(evt: Event): void {
            this.clone.balance = this.clone.balance ? parseFloat(this.clone.balance) : 0;

            this.entity = this.clone;
            this.clone = {...this.entity};
            (this.entity.uuid 
                ? this.$db.update(Account.TABLE, this.entity)
                : this.$db.insert(Account.TABLE, this.entity)
            ).then(() => {
                this.editing = false;
                this.$emit('change', this.entity);
            }).catch((_ev) => {
                const ev = <any> _ev;

                this.error = ev.explicitOriginalTarget
                    ? ev.explicitOriginalTarget.error
                    : ev;

                this.$emit('error', ev);
                this.focused = true;
            });
        },

        /**
         * Focus the panel.
         */
        focus(): void {
            (<any> this.$refs.panel).focus();
        },

        /**
         * Edit the panel.
         */
        edit(): void {
            (<any> this.$refs.panel).edit();
        },

        /**
         * Delete the account.
         */
        remove(): void {
            this.$db.delete(Account.TABLE, this.account.uuid);
        },

        /**
         * Handle panel edit event.
         */
        onEdit(): void {
            this.clone = {...this.entity};
            this.editing = true;
            
            setTimeout(() => {
               (<any> this.$refs.name).focus();
            }, 10);
        },

        /**
         * Unfocus the panel.
         */
        unfocus(): void {
            (<any> this.$refs.panel).unfocus();
        },
    },
    props: {
        /**
         * Panel account.
         */
        account: Object,

        /**
         * Seconds before the panel is focused
         * after the mousedown event.
         */
        focusTime: {
            type: [Number],
            default: 1000,
        },

        /**
         * Un-focussing time bedore removignthe 'focused' class.
         * 
         * If under 0, will be ignored in order to take the first transition
         * speed, if any.
         */
        unfocusTime: {
            type: [Number],
            default: -1,
        },
    },
    data: () => ({
        Bank,
        bank: <any> null,
        clone: <any> null,
        editing: false,
        entity: <any> null,
        error: <any> null,
        focused: <boolean|null> null,
    }),
    async mounted() {
        this.entity = this.account ?? {};
        this.clone = {...this.entity};
        this.bank = this.entity.bank && await this.$db.get(Bank.TABLE, this.account.bank);
    },
})
</script>