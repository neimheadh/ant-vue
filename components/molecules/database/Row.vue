<template>
    <tr>
        <database-field 
            v-for="field in fields" 
            :key="`${primary()}.${field.name}`" 
            :field="field"
            :value="value(field)"
        />
    </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import IDatabaseField from '~/database/IDatabaseField';

export default Vue.extend({
    methods: {
        value(field: IDatabaseField) {
            return this.row[field.name];
        },
        primary() {
            return this.row[this.primary_key];
        }
    },
    props: ['fields', 'primary_key', 'row'],
})
</script>