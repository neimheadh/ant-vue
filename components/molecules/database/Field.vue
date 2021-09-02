<template>
    <td>
        <Link v-if="link" :href="link.to" :title="link.title">{{ link.display }}</Link>
        <template v-else>{{ display }}</template>
    </td>
</template>

<script lang="ts">
import Vue from 'vue';
import DatabaseFieldType from '~/database/DatabaseFieldType';
import IDatabaseField from '~/database/IDatabaseField';
import { getTable } from '~/database/tables';

interface Link {
    display: string,
    title?: any,
    to?: string,
}

export default Vue.extend({
    data: () => ({
        link: <Link | undefined> undefined,
    }),
    
    async mounted() {
        this.link = await this.getLink();
    },

    computed: {
        display(): string {
            const field = <IDatabaseField | undefined> this.field;

            if (this.value && field && [DatabaseFieldType.Date, DatabaseFieldType.Datetime].includes(<any> field.type)) {
                const date = new Date(<number> this.value);

                return date.toLocaleString('en-US');
            }

            return `${this.value}`;
        },
    },

    methods: {
        async getLink(): Promise<Link | undefined> {
            const field = <IDatabaseField | undefined> this.field;

            if (field && field.link && this.value !== undefined) {
                const table = getTable(field.link.table);

                if (table !== undefined && table.display_field) {
                    const rel = await this.$db.get(table.name, this.value);
                    
                    if (rel) {
                        return {
                            display: rel[table.display_field],
                            title: this.value,
                            to: `${table.name}/${this.value}`,
                        };
                    }
                }
            }

            return undefined;
        }
    },
    props: {
        field: {
            type: [Object],
        },
        value: {},
    },
})
</script>