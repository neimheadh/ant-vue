/**
 * Database table link.
 */
export default interface IDatabaseTableLink {
    /**
     * Destination field.
     */
    readonly field: string;

    /**
     * Destination table.
     */
    readonly table: string;

    /**
     * To many relation
     */
    readonly toMany?: boolean;
}