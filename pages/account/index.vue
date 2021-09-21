<template>
  <LayoutPage 
    :actions="[
        { action: create, color: 'primary', icon: 'plus', title: $t('Create account') },
    ]"
    :title="$t('Edit accounts')"
  >
    <AccountList @click="click($event)"/>
  </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    /**
     * Handle account click.
     * 
     * @param evt The click event.
     */
    click(evt: CustomEvent): void {
      evt.preventDefault();
      evt.stopPropagation();

      this.$router.push({
        path: `/account/${evt.detail.uuid}/edit`,
      });
    },

    /**
     * Account creation action.
     * 
     * @param evt The action click event.
     */
    create(evt: Event): void {
        evt.preventDefault();
        evt.stopPropagation();

        this.$router.push({
            path: '/account/new',
        })
    }
  }
})
</script>