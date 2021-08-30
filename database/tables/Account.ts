import IDatabaseTable from "~/database/IDatabaseTable";
import DatabaseFieldType from "../DatabaseFieldType";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";

/**
 * The bank accounts table.
 */
export default class Account implements IDatabaseTable {
    /**
     * Account table name.
     */
    static TABLE = 'account';

    /**
     * {@inheritdoc}
     */
    readonly fields = [
        { name: 'uuid', generator: new UUIDGenerator() },
        { name: 'title' },
        { name: 'balance', type: DatabaseFieldType.Double },
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes = [
        { field: 'name' },
        { field: 'balance' },
    ];

    /**
     * {@inheritdoc}
     */
    readonly name = Account.TABLE;

    /**
     * {@inheritdoc}
     */
    readonly primary_key = 'uuid';
}