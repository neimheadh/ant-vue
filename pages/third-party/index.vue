<template>
  <PageNameEntityList
    route-base="/third-party"
    class="third-party--list"
    :name="$t('Third party')"
    :table="ThirdParty.TABLE"
    :title="$t('Edit third parties')"
  />
</template>

<script lang="ts">
import Vue from 'vue';

import ThirdParty from '~/database/tables/ThirdParty';

export default Vue.extend({
  data: () => ({
    ThirdParty,
  }),
})
</script>