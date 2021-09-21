import CurrentDateGenerator from "~/database/valueGenerators/CurrentDateGenerator";
import DatabaseFieldType from "~/database/DatabaseFieldType";
import IDatabaseTable from "~/database/IDatabaseTable";
import UUIDGenerator from "~/database/valueGenerators/UUIDGenerator";

/**
 * Transaction third-parties.
 */
export default class ThirdParty implements IDatabaseTable {

    /**
     * Table name.
     */
    static TABLE = 'third_party';

    /**
     * UUID field name.
     */
    static UUID = 'uuid';

    /**
     * {@inheritdoc}
     */
    readonly fields = [
        { name: ThirdParty.UUID, generator: new UUIDGenerator() },
        { name: 'name' },
        { name: 'creation_date', type: DatabaseFieldType.Datetime, generator: new CurrentDateGenerator() },
        { name: 'update_date', type: DatabaseFieldType.Datetime },
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes = [
        { field: 'name' },
        { field: 'creation_date' },
    ];

    /**
     * {@inheritdoc}
     */
    readonly name = ThirdParty.TABLE;

    /**
     * {@inheritdoc}
     */
    readonly primary_key = ThirdParty.UUID;
}