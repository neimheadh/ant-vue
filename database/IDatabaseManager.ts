import { Context } from "@nuxt/types";

/**
 * A database sgbd manager.
 * 
 * Implements interaction to the database system it
 * handle (InnoDB, API, ...).
 */
export default interface IDatabaseManager {
    /**
     * Nuxt context.
     */
    ctx: Context;

    /**
     * Database name.
     */
    name: string;

    /**
     * Delete in table.
     * 
     * @param table The table name.
     * @param id The deleted object id.
     */
    delete(table: string, id: any): Promise<void>;

    /**
     * Get content in table.
     * 
     * @param table The table name.
     * @param id The object id.
     * 
     * @return The content object or list.
     */
    get(table: string, id?: any): Promise<any>;

    /**
     * Insert an object in table.
     * 
     * @param table The table name.
     * @param obj The inserted object.
     * 
     * @return The inserted object in database.
     */
    insert(table: string, obj: any): Promise<any>;

    /**
     * Initialize database data.
     */
    init(): Promise<void>

    /**
     * Open database.
     */
    open(): Promise<void>;

    /**
     * Update an object in table.
     * 
     * @param table The table name. 
     * @param obj The updated object.
     * 
     * @return The updated object in database.
     */
    update(table: string, obj: any): Promise<any>;
}