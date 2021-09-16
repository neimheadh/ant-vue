<template>
    <div v-if="entity" class="editable-entity">
        <FormSelect
            v-if="editing"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target)"
            :label="label"
        >
            <Option></Option>
            <Option 
                v-for="en in list"
                
                :selected="en.uuid === value"
                :key="en.uuid"
                :value="en.uuid"
            >{{ en[displayField] }}</Option>
        </FormSelect>
        <Title v-else-if="level > 0" ref="name" :level="level">{{ entity[displayField] }}</Title>
        <template v-else>{{ entity[displayField] }}</template>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        entity: <any> null,
        list: <any[]> [],
    }),
    async mounted() {
        this.entity = await this.$db.get(this.table, this.value);
        this.list = await this.$db.get(this.table);
    },
    props: {
        /**
         * Displayed field name.
         */
        displayField: { type: String, default: 'uuid' },
        /**
         * Editing status.
         */
        editing: { type: Boolean, default: false },
        /**
         * Input label.
         */
        label: String,
        /**
         * Title level.
         */
        level: { type: Number, default: 0 },
        /**
         * Entity table.
         */
        table: String,
        /**
         * Input value.
         */
        value: {},
    },
})
</script>