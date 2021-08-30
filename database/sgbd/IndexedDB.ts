import { Context } from "@nuxt/types";
import IDatabaseSGBD from "~/database/IDatabaseSGBD";
import {default as Tables, getTable} from '~/database/tables';
import IDatabaseTable from "../IDatabaseTable";

const VERSION = 1;

/**
 * Browser IndexedDB database plugin.
 */
export default class IndexedDB implements IDatabaseSGBD {
    /**
     * Opened database.
     */
    private _db?: IDBDatabase;

    /**
     * Database open Promise.reject.
     */
    private _idbOpenReject?: (reason: any) => void;

    /**
     * Database open Promise.resolve.
     */
    private _idbOpenResolve?: (value: void | PromiseLike<void>) => void;

    /**
     * Created stores.
     */
    private _newStores: string[] = [];

    /**
     * Constructor.
     * 
     * @param ctx Nuxt context. 
     * @param name Database name.
     */
    constructor(public ctx: Context, public name: string, public version: number = VERSION) {}

    /**
     * Check if the plugin is initialized.
     * 
     * @param fn The calling function.
     * 
     * @throws The plugin is not intialized. 
     */
    private _initialized(fn: string): void {
        // While nothing is to do for initialization; do nothing.
    }

    /**
     * Database open request error.
     * 
     * @param evt The event. 
     */
    private _onDatabaseOpenError(evt: Event): void {
        const request = <IDBOpenDBRequest> evt.target;

        console.log('[IndexedDB] Error opening database %s', request.result.name);
        this._idbOpenReject && this._idbOpenReject(evt);
    }

    /**
     * Database open request success.
     * 
     * @param evt The event. 
     */
    private _onDatabaseOpenSuccess(evt: Event): void {
        const request = <IDBOpenDBRequest> evt.target;
        this._db = request.result;

        console.log('[IndexedDB] Successfully open database %s (version: %s)', request.result.name, request.result.version);

        this._idbOpenResolve && this._idbOpenResolve();
    }

    /**
     * Database upgrade needed event.
     * 
     * @param evt The event
     */
    private async _onDatabaseUpgradeNeeded(evt: Event): Promise<void> {
        const request = <IDBOpenDBRequest> evt.target;
        const db = request.result;

        console.log('[IndexedDB] Upgrading database %s', db.name);

        for (const table of Tables) {
            if (!db.objectStoreNames.contains(table.name)) {
                console.log('[IndexedDB] Create store %s', table.name);
                this._newStores.push(table.name);
            }

            const store = db.objectStoreNames.contains(table.name)
                ? request.transaction?.objectStore(table.name)
                : db.createObjectStore(table.name, { keyPath: table.primary_key });

            console.log('[IndexedDB] Initialize store %s', table.name);
            
            for (const index of table.indexes) {
                const name = index.name ?? index.field;

                if (store) {
                    store.indexNames.contains(name) && store.deleteIndex(name);
                    store.createIndex(name ?? index.field, index.field, { unique: index.unique });
                }
            }
        }

        return Promise.resolve();
    }

    /**
     * Set generated value of a dataset.
     * 
     * @param dataset The dataset.
     * @param table The associated table.
     */
    private _setGeneratedValues(dataset: any, table: IDatabaseTable): void
    {
        for (const field of table.fields) {
            if (dataset[field.name] === undefined) {
                if (field.default !== undefined) {
                    dataset[field.name] = field.default;
                } else if (field.generator) {
                    dataset[field.name] = field.generator.value();
                }
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    delete(_table: string, id: any): Promise<void> {
        if (!this._db) {
            return Promise.reject('Database not opened.');
        }

        const db = this._db;
        const table = getTable(_table);

        if (!table) {
            return Promise.reject(`Table "${_table}" doesn't exists.`);
        }

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([_table], 'readwrite');

            // Initialize transaction error handling.
            transaction.onerror = reject;

            // Delete in store.
            const store = transaction.objectStore(_table);
            const request = store.delete(id);

            request.onerror = reject;
            request.onsuccess = function() {
                resolve();
            };
        });
    }

    /**
     * {@inheritdoc}
     */
    get(table: string, id?: any): Promise<any> {
        if (!this._db) {
            return Promise.reject('Database not opened.');
        }

        const db = this._db;

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([table]);
            const store = transaction.objectStore(table);

            transaction.onerror = reject;
            
            if (!id) {
                const request = store.openCursor();
                const result: any[] = [];

                console.log('[IndexedDB] Load rows from storage %s', store.name);
    
                request.onerror = reject;
                request.onsuccess = (evt: Event) => {
                    const cursor = request.result;
    
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    } else {
                        resolve(result);
                    }
                };
            } else {
                const request = store.get(id);

                console.log('[IndexedDB] Low row %s from storage %s', id, store.name);

                request.onerror = reject;
                request.onsuccess = (evt) => {
                    resolve(request.result);
                }
            }
        });
    }

    /**
     * {@inheritdoc}
     */
    insert(_table: string, obj: any): Promise<any> {
        if (!this._db) {
            return Promise.reject('Database not opened.');
        }

        const db = this._db;
        const table = getTable(_table);

        if (!table) {
            return Promise.reject(`Table "${_table}" doesn't exists.`);
        }

        console.log('[IndexedDB] Insert in store %s :', table.name, obj);

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([_table], 'readwrite');

            // Initialize transaction error handling.
            transaction.onerror = reject;

            this._setGeneratedValues(obj, table);

            // Insert in store.
            const store = transaction.objectStore(_table);
            const request = store.add(obj);

            request.onerror = reject;
            request.onsuccess = function() {
                resolve(obj);
            }
        });
    }

    /**
     * {@inheritdoc}
     */
    async init(): Promise<void> {
        if (!this._db) {
            return Promise.reject('Database not opened.');
        }

        for (const store of this._newStores) {
            const table = getTable(store);

            if (!table) {
                return Promise.reject(`Cannot find table ${table}`);
            }

            for (let dataset of table.default_content ?? []) {
                this._setGeneratedValues(dataset, table);
                this.insert(table.name, dataset);
            }
        }

        return Promise.resolve();
    }

    /**
     * {@inheritdoc}
     */
    async open(): Promise<void> {
        this._initialized('open');
        
        if (process.browser && window) {
            const request = window.indexedDB.open(this.name, this.version);
        
            console.log('[IndexedDB] Opening database %s', this.name);
            
            return new Promise((resolve, reject) => {
                this._idbOpenReject = reject;
                this._idbOpenResolve = resolve;
    
                request.onsuccess = this._onDatabaseOpenSuccess.bind(this);
                request.onerror = this._onDatabaseOpenError.bind(this);
                request.onupgradeneeded = this._onDatabaseUpgradeNeeded.bind(this);
            });
        }

        console.warn('[IndexedDB] Window not defined -- cannot initialize database.');
        return Promise.reject();
    }
}