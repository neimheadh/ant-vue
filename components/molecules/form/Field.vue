<template>
    <Label>
        <template v-if="label">
            {{ label }}:
        </template>
        <Input v-if="type !== FieldType.Textarea"
            @input="$emit('input', $event.target.value)"

            :name="name" 
            :placeholder="placeholder"
            :step="step"
            :type="inputType"
            
            v-bind:value="value"
        />
        <Textarea v-else
            @input="$emit('input', $event.target.value)"

            :name="name"
            :placeholder="placeholder"

            v-bind:value="value"
        />
    </Label>
</template>

<script lang="ts">
import Vue from 'vue';
import { InputType } from '~/components/atoms/Input.vue';

export enum FieldType {
  Number = 'number',
  String = 'string',
  Textarea = 'textarea',
};

export default Vue.extend({

    computed: {
        /**
         * Get the field input type.
         */
        inputType(): string {
            switch (this.type) {
                case FieldType.Number:
                    return InputType.number;
                default:
                    return InputType.text;
            }
        }
    },

    data: () => ({
        FieldType,
    }),

    props: {
        /**
         * The field label.
         */
        label: {
            type: [String],
        },

        /**
         * The field name.
         */
        name: {
            type: [String],
        },

        /**
         * The field placeholder.
         */
        placeholder: {
            type: [String],
        },

        /**
         * Number type step.
         */
        step: {},

        /**
         * The field type.
         */
        type: {
            type: [String],
            default: FieldType.String,
            validator: value => {
                return Object.values(FieldType).includes(<FieldType> value);
            }
        },

        /**
         * The field value
         */
        value: {
            type: [Number, String],
        }
    },
})
</script>