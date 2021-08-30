<template>
    <div>
        <Error v-if="error">{{ error }}</Error>
        <table v-else>
            <thead>
                <tr>
                    <th v-for="field in fields" :key="field.name">
                        {{ field.name }}
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <database-row 
                    v-for="row in rows" 

                    @remove="remove"

                    :key="primary(row)" 
                    :fields="fields" 
                    :primary-key="primary_key" 
                    :row="row" 
                />
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IDatabaseField from '~/database/IDatabaseField';
import { getTable } from '~/database/tables';

export default Vue.extend({
    data() {
        return {
            error: <any> undefined,
            fields: <IDatabaseField[]> [],
            rows: <any[]> [],
        };
    },

    mounted() {
        const table = getTable(this.table);

        if (!table) {
            this.error = 'Unable to find table.';
        } else {
            this.fields = table.fields.filter((field: IDatabaseField) => {
                if (this.display && this.display.indexOf(field.name) < 0) {
                    return false;
                }

                return true;
            });
        }

        this.load();
    },

    methods: {
        load() {
            this.$db.get(this.table)
                .catch(error => this.error = error)
                .then(rows => this.rows = rows);
        },

        remove(row: any) {
            console.log(row);
            
            this.$db.delete(this.table, row[this.primary_key])
                .catch(error => this.error = error)
                .then(() => this.load());
        },

        primary(row: any) {
            return row[this.primary_key];
        }
    },
    props: {
        display: { type: [String] },
        primary_key: { type: [String], default: 'uuid' },
        table: { type: [String] },
    }
})
</script>