import Vue from 'vue';
import IDatabaseManager from './database/IDatabaseManager';

declare module 'vue/types/vue' {
    interface Vue {
        $db: IDatabaseManager;
    }
}