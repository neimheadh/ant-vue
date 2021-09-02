import IDatabaseEventTarget from "./IDatabaseEventTarget";
import IDatabaseField from "./IDatabaseField";
import IDatabaseIndex from "./IDatabaseIndex";

/**
 * A database table.
 * 
 * Gives informations about the table (name, indexes, fields...).
 */
export default interface IDatabaseTable {
    /**
     * Database default content.
     */
    readonly default_content?: any[];

    /**
     * Default sort field.
     */
    readonly default_sort?: string;

    /**
     * Used field to convert table into string representation.
     */
    readonly display_field?: string;

    /**
     * Table events target.
     */
    readonly events?: IDatabaseEventTarget;

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