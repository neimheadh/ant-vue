<template>
    <Panel class="account-panel" ref="panel" focusable @focus="focus" @unfocus="unfocus">
        <Title :level="3">{{ account.name }}</Title>
        <Title :level="4" v-if="bank">{{ bank.name }}</Title>
        <Price class="balance" :value="account.balance" :currency="account.currency" />
    </Panel>
</template>

<script lang="ts">
import Vue from 'vue'
import { ActionType } from '~/components/organisms/layout/Actions.vue';
import Account from '~/database/tables/Account';
import Bank from '~/database/tables/Bank';
import getTransitionDuration from '~/helpers/getTransitionDuration';

export default Vue.extend({
    methods: {
        /**
         * Delete the account.
         */
        delete(): void {
            const panel = <any> this.$refs.panel;
            const transition = getTransitionDuration(panel.$el, 'opacity');
            const promises = [
                this.$db.delete(Account.TABLE, this.account.uuid),
                new Promise(resolve => setTimeout(resolve, transition ?? 0)),
                panel.unfocus(),
            ];
            
            panel.$el.classList.add('deleted');
            Promise.all(promises).then(() => {
                this.$emit('deleted');
                this.$el.remove();
            });
        },
        /**
         * Edit the account.
         */
        edit(): void {

        },
        /**
         * Handle focus event.
         */
        focus(): void {
            this.$events.dispatchEvent(new CustomEvent('actions.change', {
                detail: [
                    { type: ActionType.Delete, callback: this.delete },
                    { type: ActionType.Edit, callback: this.edit },
                ],
            }));
            this.$events.dispatchEvent(new Event('actions.show'));
        },
        /**
         * Handle unfocus event.
         */
        unfocus(evt?: Event): void {
            evt?.stopPropagation();
            this.$events.dispatchEvent(new Event('actions.unchange'));
        }
    },
    props: {
        account: Object,
    },
    data: () => ({
        bank: <any> null,
    }),
    async mounted() {
        this.bank = this.account.bank && await this.$db.get(Bank.TABLE, this.account.bank);
    },
})
</script>