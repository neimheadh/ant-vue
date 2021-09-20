import IDatabaseTable from "~/database/IDatabaseTable";
import Bank from "./Bank";
import DatabaseFieldType from "../DatabaseFieldType";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";
import IDatabaseIndex from "../IDatabaseIndex";
import IDatabaseField from "../IDatabaseField";
import CurrentDateGenerator from "../valueGenerators/CurrentDateGenerator";

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
    readonly default_sort = 'creation_date';

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
        { name: 'type' },
        { name: 'balance', type: DatabaseFieldType.Double, default: 0 },
        { name: 'currency', default: 'USD' },
        { name: 'bank', link: { table: Bank.TABLE, field: Bank.UUID } },
        { name: 'creation_date', type: DatabaseFieldType.Datetime, generator: new CurrentDateGenerator() },
        { name: 'update_date', type: DatabaseFieldType.Datetime },
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes: IDatabaseIndex[] = [
        { field: 'name' },
        { field: 'balance' },
        { field: 'creation_date' },
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