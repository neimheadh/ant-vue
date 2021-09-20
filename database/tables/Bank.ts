import IDatabaseField from "../IDatabaseField";
import IDatabaseIndex from "../IDatabaseIndex";
import IDatabaseTable from "../IDatabaseTable";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";

/**
 * Banks.
 */
export default class Bank implements IDatabaseTable {
    /**
     * Table name.
     */
    static TABLE = 'bank';

    /**
     * UUID field.
     */
    static UUID = 'uuid';

    /**
     * {@inheritdoc}
     */
    readonly display_field = 'name';

    /**
     * {@inheritdoc}
     */
    readonly fields: IDatabaseField[] = [
        { name: Bank.UUID, generator: new UUIDGenerator() },
        { name: 'name' }
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes: IDatabaseIndex[] = [
        { field: 'name', unique: true }
    ];

    /**
     * {@inheritdoc}
     */
    readonly name = Bank.TABLE;

    /**
     * {@inheritdoc}
     */
    readonly primary_key = 'uuid';
}