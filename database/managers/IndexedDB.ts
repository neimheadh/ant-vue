import { Context } from "@nuxt/types";
import { default as Tables, getTable } from '~/database/tables';
import DatabaseFieldType from "../DatabaseFieldType";
import PostDelete from "../events/PostDeleteEvent";
import PostInsertEvent from "../events/PostInsertEvent";
import PostLoadEvent from "../events/PostLoadEvent";
import PostOpenEvent from "../events/PostOpenEvent";
import PostSchemaUpdateEvent from "../events/PostSchemaUpdateEvent";
import PostUpdateEvent from "../events/PostUpdateEvent";
import PreDeleteEvent from "../events/PreDeleteEvent";
import PreInsertEvent from "../events/PreInsertEvent";
import PreLoadEvent from "../events/PreLoadEvent";
import PreOpenEvent from "../events/PreOpenEvent";
import PreSchemaUpdateEvent from "../events/PreSchemaUpdateEvent";
import PreUpdateEvent from "../events/PreUpdateEvent";
import IDatabaseIndex from "../IDatabaseIndex";
import IDatabaseManager from "../IDatabaseManager";
import IDatabaseTable from "../IDatabaseTable";

const VERSION = 3;

/**
 * Browser IndexedDB database plugin.
 */
export default class IndexedDB implements IDatabaseManager {
    /**
     * The default primary key when not defined.
     */
    private readonly DEFAULT_PK = 'uuid';

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
    constructor(public ctx: Context, public name: string, private debug = false, public version = VERSION) { }

    /**
     * Database open request error.
     * 
     * @param evt The event. 
     */
    private _onDatabaseOpenError(evt: Event): void {
        const request = <IDBOpenDBRequest>evt.target;

        this.debug && console.log('[IndexedDB] Error opening database %s', request.result.name);
        this._idbOpenReject && this._idbOpenReject(evt);
    }

    /**
     * Database open request success.
     * 
     * @param evt The event. 
     */
    private _onDatabaseOpenSuccess(evt: Event): void {
        const request = <IDBOpenDBRequest>evt.target;
        const tables: IDatabaseTable[] = Tables;

        this._db = request.result;

        this.debug && console.log('[IndexedDB] Successfully open database %s (version: %s)', request.result.name, request.result.version);

        tables.forEach(table => table.events?.dispatchEvent(new PostOpenEvent(this)));
        this._idbOpenResolve && this._idbOpenResolve();
    }

    /**
     * Database upgrade needed event.
     * 
     * @param evt The event
     */
    private async _onDatabaseUpgradeNeeded(evt: Event): Promise<void> {
        const request = <IDBOpenDBRequest>evt.target;
        const db = request.result;
        const tables: IDatabaseTable[] = Tables;

        tables.forEach(table => table.events?.dispatchEvent(new PreSchemaUpdateEvent(this)));

        this.debug && console.log('[IndexedDB] Upgrading database %s', db.name);

        for (const table of Tables) {
            if (!db.objectStoreNames.contains(table.name)) {
                this.debug && console.log('[IndexedDB] Create store %s', table.name);
                this._newStores.push(table.name);
            }

            const store = db.objectStoreNames.contains(table.name)
                ? request.transaction?.objectStore(table.name)
                : db.createObjectStore(table.name, { keyPath: table.primary_key });

            this.debug && console.log('[IndexedDB] Initialize store %s', table.name);

            for (const _index of table.indexes) {
                const index = <IDatabaseIndex> _index;
                const name = index.name ?? index.field;

                if (store) {
                    store.indexNames.contains(name) && store.deleteIndex(name);
                    store.createIndex(name ?? index.field, index.field, { unique: index.unique });
                }
            }
        }

        tables.forEach(table => table.events?.dispatchEvent(new PostSchemaUpdateEvent(this)));
        return Promise.resolve();
    }

    /**
     * Parse the loaded document to fix the fields types.
     * 
     * @param document The document. 
     * @param table The table the document is from.
     * 
     * @return The document.
     */
    private _parseDocument(document: any, table: IDatabaseTable): any {
        for (const field of table.fields) if (document[field.name] !== undefined) {
            switch (field.type) {
                case DatabaseFieldType.Integer:
                    document[field.name] = parseInt(document[field.name]);
                    break;
                case DatabaseFieldType.Double:
                    document[field.name] = parseFloat(document[field.name]);
                    break;
            }
        }

        return document;
    }

    /**
     * Set generated value of a dataset.
     * 
     * @param dataset The dataset.
     * @param table The associated table.
     */
    private _setGeneratedValues(dataset: any, table: IDatabaseTable): void {
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
    async delete(_table: string, id: any): Promise<void> {
        if (!this._db) {
            return Promise.reject('Database not opened.');
        }

        const db = this._db;
        const table = getTable(_table);

        if (!table) {
            return Promise.reject(`Table "${_table}" doesn't exists.`);
        }

        this.debug && console.log('[IndexedDB] Delete in store %s :', table.name, id);
        table.events?.dispatchEvent(new PreDeleteEvent(this, { id }));

        const deleted = await this.get(table.name, id);

        if (!deleted) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([_table], 'readwrite');

            // Initialize transaction error handling.
            transaction.onerror = (ev) => {
                this.debug && console.error('[IndexedDB] Delete transaction init error.', (<any> ev).explicitOriginalTarget.error);
                reject(ev);
            };

            // Delete in store.
            const store = transaction.objectStore(_table);
            const request = store.delete(id);

            request.onerror = (ev) => {
                this.debug && console.error('[IndexedDB] Delete request error.', (<any> ev).explicitOriginalTarget.error);
                reject(ev);
            };;
            request.onsuccess = () => {
                resolve();
                table.events?.dispatchEvent(new PostDelete(this, deleted));
            };
        });
    }

    /**
     * {@inheritdoc}
     */
    get(_table: string, id?: any): Promise<any> {
        if (!this._db) {
            return Promise.reject('Database not opened.');
        }

        const db = this._db;
        const table = getTable(_table);

        if (!table) {
            return Promise.reject(`Table "${_table}" doesn't exists.`);
        }
        table.events?.dispatchEvent(new PreLoadEvent(this, { id }));

        this.debug && console.log('[IndexedDB] Get element(s)', _table, id);

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([table.name]);
            const store = transaction.objectStore(table.name);

            transaction.onerror = reject;

            if (!id) {
                const request = table.default_sort
                    ? store.index(table.default_sort).openCursor()
                    : store.openCursor();
                const result: any[] = [];

                this.debug && console.log('[IndexedDB] Load rows from storage %s', store.name);

                request.onerror = (ev) => {
                    this.debug && console.error('[IndexedDB] Get request error.', (<any> ev).explicitOriginalTarget.error);
                    reject(ev);
                };;
                request.onsuccess = (evt: Event) => {
                    const cursor = request.result;

                    if (cursor) {
                        const document = this._parseDocument(cursor.value, table);
                        result.push(document);
                        table.events?.dispatchEvent(new PostLoadEvent(this, document));
                        cursor.continue();
                    } else {
                        resolve(result);
                    }
                };
            } else {
                const request = store.get(id);

                this.debug && console.log('[IndexedDB] Load row %s from storage %s', id, store.name);

                request.onerror = (ev) => {
                    this.debug && console.error('[IndexedDB] Get request error.', (<any> ev).explicitOriginalTarget.error);
                    reject(ev);
                };;
                request.onsuccess = (evt) => {
                    const document = this._parseDocument(request.result, table);
                    table.events?.dispatchEvent(new PostLoadEvent(this, document));
                    resolve(document);
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

        this.debug && console.log('[IndexedDB] Insert in store %s :', table.name, obj);
        table.events?.dispatchEvent(new PreInsertEvent(this, obj));

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([_table], 'readwrite');

            // Initialize transaction error handling.
            transaction.onerror = (ev) => {
                this.debug && console.error('[IndexedDB] Insert transaction init error.', (<any> ev).explicitOriginalTarget.error);
                reject(ev);
            }

            this._setGeneratedValues(obj, table);

            // Insert in store.
            const store = transaction.objectStore(_table);
            const request = store.add(obj);

            request.onerror = (ev) => {
                this.debug && console.error('[IndexedDB] Insert request error.', (<any> ev).explicitOriginalTarget.error);
                reject(ev);
            };
            request.onsuccess = async () => {
                if (table.events) {
                    table.events.dispatchEvent(new PostInsertEvent(this, obj));
                    await table.events.processing;
                }

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
                await this.insert(table.name, dataset);
            }
        }

        return Promise.resolve();
    }

    /**
     * {@inheritdoc}
     */
    async open(): Promise<void> {
        const tables: IDatabaseTable[] = Tables;

        tables.forEach(table => table.events?.dispatchEvent(new PreOpenEvent(this)));

        if (process.browser && window) {
            const request = window.indexedDB.open(this.name, this.version);

            this.debug && console.log('[IndexedDB] Opening database %s', this.name);

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

    update(_table: string, obj: any): Promise<any> {
        if (!this._db) {
            return Promise.reject('Database not opened.');
        }

        const db = this._db;
        const table = getTable(_table);

        if (!table) {
            return Promise.reject(`Table "${_table}" doesn't exists.`);
        }

        this.debug && console.log('[IndexedDB] Update in store %s :', table.name, obj);

        return new Promise((resolve, reject) => {
            this.get(table.name, obj[table.primary_key ?? this.DEFAULT_PK]).then((previous: any) => {
                table.events?.dispatchEvent(new PreUpdateEvent(this, obj, previous));

                const transaction = db.transaction([_table], 'readwrite');

                // Initialize transaction error handling.
                transaction.onerror = (ev) => {
                    this.debug && console.error('[IndexedDB] Update transaction init error.', (<any> ev).explicitOriginalTarget.error);
                    reject(ev);
                };

                this._setGeneratedValues(obj, table);

                // Insert in store.
                const store = transaction.objectStore(_table);
                const request = store.put(obj);

                request.onerror = (ev) => {
                    this.debug && console.error('[IndexedDB] Update request error.', (<any> ev).explicitOriginalTarget.error);
                };
                request.onsuccess = async () => {
                    if (table.events) {
                        table.events.dispatchEvent(new PostUpdateEvent(this, obj, previous));
                        await table.events.processing;
                    }
                    resolve(obj);
                }
            }).catch((reason) => {
                this.debug && console.error('[IndexedDB] Update get previous version error.', reason);
                reject(reason);
            });
        });        
    }
}