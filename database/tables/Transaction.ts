import DatabaseFieldType from "../DatabaseFieldType";
import IDatabaseTable from "../IDatabaseTable";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";

/**
 * Account transaction table.
 */
export default class Transaction implements IDatabaseTable {
    /**
     * {@inheritdoc}
     */
    readonly default_content = [
        { uuid: '7c4de92d-350e-4211-8b5c-71b5564847dc', account: '64ce919a-3c29-4568-a8dd-0a3ecd4d1acd', label: 'Salary', balance: 2000 },
        { uuid: '9a272eb0-b6b9-4a07-a272-fec7aa95f8cb', account: '64ce919a-3c29-4568-a8dd-0a3ecd4d1acd', label: 'Burger', balance: -34.8 },
        { uuid: 'bdbba740-2b5f-497e-9841-91b072fb14c3', account: '64ce919a-3c29-4568-a8dd-0a3ecd4d1acd', label: 'Month saving', balance: -500 },
        { uuid: 'c4bf10ae-efed-4c57-939f-0ab62d90c9dc', account: '1ccf2f29-7a3f-4bf5-9d4f-a36f19d28759', label: 'Month saving', balance: 500 },
    ];

    /**
     * {@inheritdoc}
     */
    readonly fields = [
        { name: 'uuid', generator: new UUIDGenerator() },
        { name: 'operation_date', type: DatabaseFieldType.Datetime, default: Date.now() },
        { name: 'record_date', type: DatabaseFieldType.Datetime },
        { name: 'account' },
        { name: 'label' },
        { name: 'balance', type: DatabaseFieldType.Double },
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes = [
        { field: 'operation_date' },
        { field: 'record_date' },
        { field: 'account' },
        { field: 'label' },
        { field: 'balance' },
    ];

    /**
     * {@inheritdoc}
     */
    readonly name = 'transaction';

    /**
     * {@inheritdoc}
     */
    readonly primary_key = 'uuid';
    
}