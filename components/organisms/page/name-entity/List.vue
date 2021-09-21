<!--
    Page component for database with only an editable / visible name.
-->

<template>
    <LayoutPage 
        class="page--named-entity--list"
        :actions="[
            { action: create, color: 'primary', icon: 'plus', title: createBtnTitle },
        ]"
        :title="displayedTitle"
    >
        <Loading v-if="loading" />
        <Error v-else-if="error">{{ error }}</Error>
        <div v-else>
            <Card 
                v-for="entity in entities" :key="entity[fieldUuid]"
                class="clickable"
                @click="click($event, entity)"
            >
                <Title :level="titleLevel">{{ entity[fieldName] }}</Title>
            </Card>
        </div>
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        /**
         * Get the title for the create button.
         */
        createBtnTitle(): string {
            return this.$t(`Create ${this.displayedName}`).toString();
        },

        /**
         * The displayed name.
         * 
         * The given name or the table name if any.
         */
        displayedName(): string {
            return this.name ?? this.table;
        },

        /**
         * The base route path.
         */
        baseRoutePath(): string {
            return this.routeBase 
             ? (this.routeBase.substr(0, 1) == '/' ? '' : '/') + this.routeBase
             : `/${this.table}`;
        },

        /**
         * Displayed title.
         */
        displayedTitle(): string {
            return this.title ?? this.$t(`List ${this.displayedName}`);
        },
    },

    methods: {
        /**
         * Handle click event.
         * 
         * @param evt The click event.
         * @param entity The clicked entity.
         */
        click(evt: Event, entity: any): void {
            const event = new CustomEvent('click', entity);

            evt.preventDefault();
            evt.stopPropagation();

            this.$router.push({ path: this.getEditRoutePath(entity) });
        },

        /**
         * Handle create element button click.
         * 
         * @param evt The click event.
         */
        create(evt: Event): void {
            evt.preventDefault();
            evt.stopPropagation();

            this.$router.push({ path: this.getNewRoutePath() });
        },

        /**
         * Get the edit route path for the given entity.
         * 
         * @param entity The entity.
         * 
         * @return The edit route path.
         */
        getEditRoutePath(entity: any): string {
            const path = this.routeEdit.substr(0, 1) === '/'
                ? this.routeEdit
                : `/${this.routeEdit}`;
            
            return `${this.baseRoutePath}/${entity[this.fieldUuid]}${path}`;
        },

        /**
         * Get the new route path.
         * 
         * @return The new route path.
         */
        getNewRoutePath(): string {
            const path = this.routeNew.substr(0, 1) === '/'
                ? this.routeNew
                : `/${this.routeNew}`;
            
            return `${this.baseRoutePath}${path}`;
        },
    },

    props: {
        /**
         * Entity name field.
         */
        fieldName: {type: String, default: 'name'},
        /**
         * Entity uuid field.
         */
        fieldUuid: {type: String, default: 'uuid'},
        /**
         * Listed entities name.
         */
        name: String,
        /**
         * Base route path.
         */
        routeBase: String,
        /**
         * Edit route path.
         */
        routeEdit: { type: String, default: '/edit' },
        /**
         * New route path.
         */
        routeNew: { type: String, default: '/new' },
        /**
         * Table name.
         */
        table: String,
        /**
         * Page title.
         */
        title: String,
        /**
         * Title level.
         */
        titleLevel: {type: [Number, String], default: 3},
    },

    data: () => ({
        /**
         * Entities list.
         */
        entities: <any[]> [],

        /**
         * Catched error.
         */
        error: <any> undefined,

        /**
         * True if loading.
         */
        loading: true,
    }),

    mounted() {
        this.$db.get(this.table)
            .catch(reason => this.error = reason)
            .then(entities => {
                this.entities = entities;
                this.loading = false;
            });
    }
})
</script>