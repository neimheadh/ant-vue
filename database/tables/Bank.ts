import IDatabaseField from "../IDatabaseField";
import IDatabaseIndex from "../IDatabaseIndex";
import IDatabaseTable from "../IDatabaseTable";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";

/**
 * Banks.
 */
export default class Bank implements IDatabaseTable {
    /**
     * {@inheritdoc}
     * 
     * @todo Remove -- this is just a test.
     */
    readonly default_content = [
        { uuid: 'a3dd1137-c794-4efd-b0f6-e971994236ac', name: 'My Bank' },
    ];

    /**
     * {@inheritdoc}
     */
    readonly fields = [
        { name: 'uuid', generator: new UUIDGenerator() },
        { name: 'name' }
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes = [
        { field: 'name', unique: true }
    ];

    /**
     * {@inheritdoc}
     */
    readonly name = 'bank';

    /**
     * {@inheritdoc}
     */
    readonly primary_key = 'uuid';
}