<template>
    <td>{{ display }}</td>
</template>

<script lang="ts">
import Vue from 'vue'
import IDatabaseField from '~/database/IDatabaseField'
import IDatabaseTable from '~/database/IDatabaseTable';
import { getTable } from '~/database/tables';

export default Vue.extend({
    data: () => ({
        display: <any> undefined,
    }),

    async mounted() {
        this.display = await this.load();
    },

    methods: {
        async load() {
            const field = <IDatabaseField> this.field;
            let link: any, table: IDatabaseTable | undefined;

            if (field.link) {
                table = getTable(field.link.table);

                if (table && table.display_field) {
                    link = await this.$db.get(table.name, this.value);
                }
            }

            console.log(field.name, field.link, link, table, table?.display_field);

            return link && table && table.display_field
                ? link[table.display_field]
                : this.value;
        },
    },

    props: ['field', 'value'],
})
</script>