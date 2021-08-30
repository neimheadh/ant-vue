import { Context, Inject } from "@nuxt/types/app";
import IndexedDB from "~/database/sgbd/IndexedDB";

export default async (ctx: Context, inject: Inject) => {
    if (process.browser) {
        const db = new IndexedDB(ctx, 'ant-bank-manager');
        await db.open();
        return inject('db', db);
    }
}