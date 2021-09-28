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
        { name: 'balance', type: DatabaseFieldType.Double, default: 0 },
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