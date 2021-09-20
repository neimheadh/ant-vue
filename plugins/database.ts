import { Context, Inject } from "@nuxt/types/app";
import IndexedDB from "~/database/managers/IndexedDB";

export default async (ctx: Context, inject: Inject) => {
    const debug = true;

    if (process.browser) {
        const db = new IndexedDB(ctx, 'ant-bank-manager', debug);
        
        await db.open();
        await db.init();

        return inject('db', db);
    }
}