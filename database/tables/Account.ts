import IDatabaseTable from "~/database/IDatabaseTable";
import DatabaseFieldType from "../DatabaseFieldType";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";

/**
 * Bank accounts table.
 */
export default class Account implements IDatabaseTable {
    /**
     * Account table name.
     */
    static TABLE = 'account';

    /**
     * {@inheritdoc}
     */
    readonly default_content = [
        { uuid: '64ce919a-3c29-4568-a8dd-0a3ecd4d1acd', name: 'Main account', bank: '4ce919a-3c29-4568-a8dd-0a3ecd4d1acd' },
        { uuid: '1ccf2f29-7a3f-4bf5-9d4f-a36f19d28759', name: 'Save account', bank: '4ce919a-3c29-4568-a8dd-0a3ecd4d1acd' },
    ];

    /**
     * {@inheritdoc}
     */
    readonly fields = [
        { name: 'uuid', generator: new UUIDGenerator() },
        { name: 'title' },
        { name: 'balance', type: DatabaseFieldType.Double, default: 0 },
        { name: 'bank' },
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