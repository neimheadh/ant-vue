import IDatabaseField from "./IDatabaseField";
import IDatabaseIndex from "./IDatabaseIndex";

/**
 * A database table.
 * 
 * Gives informations about the table (name, indexes, fields...).
 */
export default interface IDatabaseTable {
    /**
     * The table fields.
     */
    readonly fields: IDatabaseField[];

    /**
     * The indexed fields.
     */
    readonly indexes: IDatabaseIndex[];

    /**
     * The table name.
     */
    readonly name: string;

    /**
     * The primary key field name.
     */
    readonly primary_key?: string;
}