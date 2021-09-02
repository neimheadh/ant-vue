import DatabaseFieldType from "../DatabaseFieldType";
import DatabaseEventTarget from "../events/DatabaseEventTarget";
import PostInsertEvent from "../events/PostInsertEvent";
import PostUpdateEvent from "../events/PostUpdateEvent";
import IDatabaseField from "../IDatabaseField";
import IDatabaseIndex from "../IDatabaseIndex";
import IDatabaseTable from "../IDatabaseTable";
import CurrentDateGenerator from "../valueGenerators/CurrentDateGenerator";
import UUIDGenerator from "../valueGenerators/UUIDGenerator";
import Account from "./Account";

/**
 * Account transaction table.
 */
export default class Transaction implements IDatabaseTable {
    /**
     * UUID field.
     */
    static UUID = 'uuid';

    /**
     * Table name.
     */
    static TABLE = 'transaction';

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
    readonly default_sort = 'operation_date';

    /**
     * {@inheritdoc}
     */
    readonly display_field = 'label';

    /**
     * {@inheritdoc}
     */
    readonly events = new DatabaseEventTarget();

    /**
     * {@inheritdoc}
     */
    readonly fields: IDatabaseField[] = [
        { name: Transaction.UUID, generator: new UUIDGenerator() },
        { name: 'operation_date', type: DatabaseFieldType.Datetime, generator: new CurrentDateGenerator },
        { name: 'record_date', type: DatabaseFieldType.Datetime },
        { name: 'account', link: { table: Account.TABLE, field: Account.UUID } },
        { name: 'label' },
        { name: 'balance', type: DatabaseFieldType.Double },
    ];

    /**
     * {@inheritdoc}
     */
    readonly indexes: IDatabaseIndex[] = [
        { field: 'operation_date' },
        { field: 'record_date' },
        { field: 'account' },
        { field: 'label' },
        { field: 'balance' },
    ];

    /**
     * {@inheritdoc}
     */
    readonly name = Transaction.TABLE;

    /**
     * {@inheritdoc}
     */
    readonly primary_key = 'uuid';
    
    /**
     * Constructor.
     */
    constructor() {
        this.events.addEventListener(PostInsertEvent.NAME, this._onPostInsert);
        this.events.addEventListener(PostUpdateEvent.NAME, this._onPostUpdate);
    }

    /**
     * Handle post insert event.
     * 
     * @param event The post-insert event.
     */
    private async _onPostInsert(_event: Event): Promise<void> {
        const event = <PostInsertEvent> _event;

        if (event.inserted) {
            const account = await event.manager.get(Account.TABLE, event.inserted.account);

            if (account) {
                account.balance = parseFloat(account.balance) + parseFloat(event.inserted.balance);

                await event.manager.update(Account.TABLE, account);
            }
        }
    }

    /**
     * Handle post-update event.
     * 
     * @param event The post-update event.
     */
    private async _onPostUpdate(_event: Event): Promise<void> {
        const event = <PostUpdateEvent> _event;

        if (event.updated && event.previous) {
            if (event.updated.account !== event.previous.account) {
                const previous_account = await event.manager.get(Account.TABLE, event.previous.account);
                const new_account = await event.manager.get(Account.TABLE, event.updated.account);

                if (previous_account) {
                    previous_account.balance = parseFloat(previous_account.balance) - parseFloat(event.previous.balance);
                    await event.manager.update(Account.TABLE, previous_account);
                }

                if (new_account) {
                    new_account.balance = parseFloat(new_account.balance) + parseFloat(event.updated.balance);
                    await event.manager.update(Account.TABLE, new_account);
                }
            } else {
                const diff = parseFloat(event.previous.balance) - parseFloat(event.updated.balance);
                const account = await event.manager.get(Account.TABLE, event.updated.account);

                if (account) {
                    account.balance = parseFloat(account.balance) + diff;
                    await event.manager.update(Account.TABLE, account);
                }
            }
        }
    }
}