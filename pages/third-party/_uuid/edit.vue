<template>
    <Loading v-if="!thirdParty" />
    <PageNameEntityForm
        v-else
        
        route-base="/third-party"
        
        :entity="thirdParty"
        :name="$t('Third party')"
        :table="ThirdParty.TABLE"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import ThirdParty from '~/database/tables/ThirdParty';

export default Vue.extend({
    data() {
        return {
            ThirdParty,
            thirdParty: <any> undefined,
        };
    },
    async mounted() {
        this.thirdParty = await this.$db.get(ThirdParty.TABLE, this.$route.params.uuid);
    }
})
</script>