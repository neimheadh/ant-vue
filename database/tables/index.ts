import IDatabaseTable from '../IDatabaseTable';
import Account from './Account';
import Bank from './Bank';
import Transaction from './Transaction';

const tables: IDatabaseTable[] = [
    new Account,
    new Bank,
    new Transaction,
];

export default tables;