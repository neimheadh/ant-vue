<template>
    <PageNameEntityForm
        route-base="/third-party"
        
        :name="$t('Third party')"
        :table="ThirdParty.TABLE"
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