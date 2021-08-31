<template>
    <tr>
        <database-field 
            v-for="field in fields"

            @insert="$emit('insert', $event.target.value)"

            :key="`${primary()}.${field.name}`" 
            :field="field"
            :value="value(field)"
            :table="table"
        />
        <td>
            <Button @click="$emit('remove', row)">Delete</Button>
        </td>
    </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import IDatabaseField from '~/database/IDatabaseField';

export default Vue.extend({
    methods: {
        value(field: IDatabaseField) {
            return this.row[field.name] ?? '';
        },
        primary() {
            return this.row[this.primaryKey];
        },
    },
    props: ['fields', 'primaryKey', 'row', 'table'],
})
</script>