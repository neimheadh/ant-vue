import IDatabaseTable from "~/database/IDatabaseTable";
import Bank from "./Bank";
import DatabaseFieldType from "../DatabaseFieldType";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";
import IDatabaseIndex from "../IDatabaseIndex";
import IDatabaseField from "../IDatabaseField";

/**
 * Bank accounts table.
 */
export default class Account implements IDatabaseTable {
    /**
     * UUID field.
     */
    static UUID = 'uuid';

    /**
     * Account table name.
     */
    static TABLE = 'account';

    /**
     * {@inheritdoc}
     */
    readonly default_content = [
        { uuid: '64ce919a-3c29-4568-a8dd-0a3ecd4d1acd', name: 'Main account', bank: 'a3dd1137-c794-4efd-b0f6-e971994236ac' },
        { uuid: '1ccf2f29-7a3f-4bf5-9d4f-a36f19d28759', name: 'Save account', bank: 'a3dd1137-c794-4efd-b0f6-e971994236ac' },
    ];

    /**
     * {@inheritdoc}
     */
    readonly display_field = 'name';

    /**
     * {@inheritdoc}
     */
    readonly fields: IDatabaseField[] = [
        { name: Account.UUID, generator: new UUIDGenerator() },
        { name: 'name' },
        { name: 'balance', type: DatabaseFieldType.Double, default: 0 },
        { name: 'bank', link: { table: Bank.TABLE, field: Bank.UUID } },
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes: IDatabaseIndex[] = [
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