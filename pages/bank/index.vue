<template>
  <PageNameEntityList
    class="bank--list"
    :table="Bank.TABLE"
    :title="$t('Edit banks')"
  />
</template>

<script lang="ts">
import Vue from 'vue';

import Bank from '~/database/tables/Bank';

export default Vue.extend({
  data: () => ({
    Bank,
  }),
})
</script>