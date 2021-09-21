<template>
    <LayoutPage
        class="page--named-entity--form"
        :actions="actions"
        :title="displayedTitle"
    >
        <Card>
            <Form ref="form" @submit="submit">
                <EditableText
                    v-model="$data._entity[fieldName]"
                    ref="focus"
                    :label="displayedLabel"
                    required
                />
                <input type="submit" class="hidden" />
            </Form>
        </Card>
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue';

import { Action } from '~/components/organisms/layout/Page.vue';

export default Vue.extend({
    computed: {
        /**
         * Page actions.
         */
        actions(): Action[] {
            const actions = <Action[]> [];

            if (this.entity) {
                actions.push({ action: this.remove, color: 'danger', icon: 'trash', title: this.$t('Delete').toString() });
            }

            actions.push({ action: this.cancel, color: 'secondary', icon: 'times', title: this.$t('Cancel').toString() });
            actions.push({ action: this.submit, color: 'success', icon: 'check', title: this.$t('Validate').toString() });

            return actions;
        },

        /**
         * Base route.
         */
        baseRoute(): string {
            return this.routeBase
                ? (this.routeBase.substr(0, 1) === '/' ? this.routeBase : `/${this.routeBase}`)
                : `/${this.table}`;
        },

        /**
         * Displayed label.
         */
        displayedLabel(): string {
            return this.label ?? this.$t(`${this.displayedName} name`);
        },

        /**
         * Displayed name.
         * 
         * The given name or the table name if any.
         */
        displayedName(): string {
            return this.name ?? this.table;
        },

        /**
         * Displayed title.
         */
        displayedTitle(): string {
            return this.title ?? (this.entity
                ? this.$t(`Edit ${this.displayedName}`, this._entity)
                : this.$t(`New ${this.displayedName}`, this._entity));
        },
    },

    methods: {
        /**
         * Handle button cancel click.
         * 
         * Go back without saving.
         */
        cancel(evt?: Event): void {
            evt?.stopPropagation();
            evt?.preventDefault();

            this.$router.replace(this.baseRoute);
        },

        /**
         * Delete entity.
         */
        remove(evt?: Event): void {
            evt?.stopPropagation();
            evt?.preventDefault();

            if (confirm(this.$t('Are you sure?').toString())) {
                this.$db.delete(this.table, this._entity[this.fieldUuid])
                    .then(() => this.$router.replace(this.baseRoute));
            }
        },

        /**
         * Handle form submit.
         * 
         * Save the entity in database.
         */
        submit(evt?: Event): void {
            evt?.stopPropagation();
            evt?.preventDefault();

            if((<any> this.$refs.form).checkValidity()) {
                ( this.entity
                    ? this.$db.update(this.table, this.$data._entity)
                    : this.$db.insert(this.table, this.$data._entity)
                ).then(() => this.$router.replace(this.baseRoute));
            }
        },
    },

    props: {
        /**
         * Edited entity.
         */
        entity: Object,
        /**
         * Entity name field.
         */
        fieldName: {type: String, default: 'name'},
        /**
         * Entity uuid field.
         */
        fieldUuid: {type: String, default: 'uuid'},
        /**
         * Name field label.
         */
        label: String,
        /**
         * Entity name.
         */
        name: String,
        /**
         * Base route.
         */
        routeBase: String,
        /**
         * Table name.
         */
        table: String,
        /**
         * Page title.
         */
        title: String,
    },

    data: () => ({
        /**
         * Modifiable entity.
         */
        _entity: <any> {},
        /**
         * Form element.
         */
        _form: <any> undefined,
    }),

    mounted() {
        // Set the form element.
        this.$data._form = this.$refs.form;

        // Focus on the name input.
        (<any> this.$refs.focus).focus();

        // Set modifiable entity.
        if (this.entity !== undefined) {
            this.$data._entity = this.entity;
        }
    },
})
</script>