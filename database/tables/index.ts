import IDatabaseTable from '../IDatabaseTable';
import AccountTable from './Account';
import BankTable from './Bank';
import ThirdPartyTable from './ThirdParty';
import TransactionTable from './Transaction';

export const Account = new AccountTable();
export const Bank = new BankTable();
export const ThirdParty = new ThirdPartyTable();
export const Transaction = new TransactionTable();

const tables = [
    Account,
    Bank,
    ThirdParty,
    Transaction,
];

export const getTable = (name: string): IDatabaseTable | undefined => {
    for (const table of tables) {
        if (table.name === name) {
            return table;
        }
    }
}

export default tables;