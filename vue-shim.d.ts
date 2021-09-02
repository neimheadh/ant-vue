import Vue from 'vue';
import IDatabaseSGBD from './database/IDatabaseSGBD';

declare module 'vue/types/vue' {
    interface Vue {
        $db: IDatabaseSGBD;
    }
}