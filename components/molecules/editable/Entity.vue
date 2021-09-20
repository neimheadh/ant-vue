<template>
    <div v-if="entity" class="editable-entity">
        <FormSelect
            v-if="editing"
            v-bind:value="value"

            :label="label"

            @error="$emit('error', $event)"
            @input="$emit('input', $event)"
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
    methods: {
        /**
         * Check if the form is valid.
         */
        reportValidity(): boolean {
            return this.$refs.input && (<any> this.$refs.input).reportValidity();
        },
    },
    props: {
        /**
         * Displayed field name.
         */
        displayField: { type: String, default: 'uuid' },
        /**
         * Editing status.
         */
        editing: { type: Boolean, default: true },
        /**
         * Input label.
         */
        label: String,
        /**
         * Title level.
         */
        level: { type: Number, default: 0 },
        /**
         * Input required status.
         */
        required: Boolean,
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