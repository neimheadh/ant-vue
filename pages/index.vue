<template>
  <LayoutPage :title="$t('Homepage')">
    <Title level="2">{{ $t('My accounts') }}</Title>
    <AccountList @click="clickAccount($event)"/>
  </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    /**
     * Handle account click.
     */
    clickAccount(evt: CustomEvent): void {
      evt.preventDefault();
      evt.stopPropagation();

      this.$router.push({
        path: `/account/${evt.detail.uuid}`,
      });
    }
  }
})
</script>