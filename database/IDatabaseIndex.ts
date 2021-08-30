export default interface IDatabaseIndex {
    /**
     * Index field.
     */
    field: string;

    /**
     * Index name.
     */
    name?: string;

    /**
     * Is the indexed field unique?
     */
    unique?: boolean;
}