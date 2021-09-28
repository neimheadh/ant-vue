<template>
    <span v-if="entity" class="entity">
        {{ entity[displayField] }}
    </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        /**
         * Entity displayed field.
         */
        displayField: {
            type: String,
            default: 'name',
        },
        /**
         * Entity table.
         */
        table: String,
        /**
         * Entity uuid.
         */
        uuid: String,
    },

    data: () => ({
        /**
         * The loaded entity.
         */
        entity: <any> undefined,
    }),

    async mounted() {
        this.entity = await this.$db.get(this.table, this.uuid);
    },
})
</script>