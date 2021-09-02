<template>
  <input
    :type="type" 
    :placeholder="placeholder"
    :step="type === InputType.number && step"

    v-bind:value="value"
    v-on:input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * Possible HTML input types.
 */
export enum InputType {
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetime_local = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week',
};

/**
 * Input atom.
 */
export default Vue.extend({
  data: () => ({
    InputType,
  }),
  props: {
    /**
     * The input type.
     */
    type: {
      type: [String],
      default: InputType.text,
      validator: value => {
        return Object.values(InputType).includes(<InputType> value);
      },
    },

    /**
     * The input placeholder.
     */
    placeholder: {
      type: [String],
    },

    /**
     * The input default value.
     */
    value: {
      type: [Number, String],
    },

    /**
     * Number type step.
     */
    step: {
      validator: value => {
        return typeof value === 'number' || value === "any";
      }
    }
  }
})
</script>