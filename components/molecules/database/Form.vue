<template>
    <form @submit="submit($event)">
        <form-field v-for="input in inputs"
            :key="input.key"
            :label="input.name"
            :placeholder="input.name"
            :step=".01"
            :type="input.type"

            v-model="model[input.name]"
        />
        <Button type="submit">Submit</Button>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { FieldType } from '~/components/molecules/form/Field.vue';
import DatabaseFieldType from '~/database/DatabaseFieldType';
import IDatabaseField from '~/database/IDatabaseField';
import IDatabaseTable from '~/database/IDatabaseTable';
import { getTable } from '~/database/tables';

interface InputObj {
    key: string,
    name: string,
    type: FieldType,
}

export default Vue.extend({
    data: () => ({
        clears: 0,
        model: <any> {},
    }),

    mounted() {
        this.clear();
    },

    computed: {
        activeFields(): IDatabaseField[] {
            return this.dbTable.fields.filter((field: IDatabaseField) => {
                if (this.fields && this.fields.length) {
                    return this.fields.includes(field.name);
                }

                return field.generator === undefined;
            });
        },

        inputs(): InputObj[] {
            return this.activeFields.map(field => ({
                key: `${field.name}--${this.clears}`, 
                name: field.name,
                type: this.inputType(field.type),
            }))
        },

        dbTable(): IDatabaseTable {
            const table = getTable(this.table);

            if (!table) {
                throw Error(`Cannot find table ${this.table}`);
            }

            return table;
        }
    },

    methods: {
        clear(): void {
            this.model = {};

            for (const field of this.activeFields) {
                this.model[field.name] = field.default;
            }

            this.clears++;
        },

        inputType(type?: DatabaseFieldType): FieldType {
            let input: FieldType = FieldType.String;

            switch (type) {
                case DatabaseFieldType.Double:
                case DatabaseFieldType.Integer:
                    input = FieldType.Number;
                    break;
                case DatabaseFieldType.Text:
                    input = FieldType.Textarea;
                    break;
            }

            return input;
        },

        async submit(evt: Event): Promise<void> {            
            evt.preventDefault();

            await this.$db.insert(this.dbTable.name, this.model);

            this.$emit('insert');
            this.clear();
        }
    },

    props: {
       fields: { type: [Array]},
       table: { type: [String] },   
    },
});
</script>