<template>
  <LayoutPage 
    :actions="[
        { action: create, color: 'primary', icon: 'plus', title: $t('Create bank') },
    ]"
    :title="$t('Banks')"
  >
    <BankList @click="click($event)"/>
  </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    /**
     * Handle bank click.
     * 
     * @param evt The click event.
     */
    click(evt: CustomEvent): void {
      evt.preventDefault();
      evt.stopPropagation();

      this.$router.push({
        path: `/bank/${evt.detail.uuid}/edit`,
      });
    },

    /**
     * Bank creation action.
     * 
     * @param evt The action click event.
     */
    create(evt: Event): void {
        evt.preventDefault();
        evt.stopPropagation();

        this.$router.push({
            path: '/bank/new',
        })
    }
  }
})
</script>