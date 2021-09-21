<template>
    <LayoutPage v-if="thirdParty" previous="/third-party" title="Third party">
        {{ thirdParty.name }}
    </LayoutPage>
</template>

<script lang="ts">
import Vue from 'vue'
import ThirdParty from '~/database/tables/ThirdParty';

export default Vue.extend({
    data() {
        return {
            thirdParty: <any> undefined,
        };
    },
    async mounted() {
        this.thirdParty = await this.$db.get(ThirdParty.TABLE, this.$route.params.uuid);
    }
})
</script>