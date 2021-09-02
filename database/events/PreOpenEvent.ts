import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database pre-database open event.
 */
 export default class PreOpenEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'pre_open';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager) {
        super(PreOpenEvent.NAME, manager)
    }
}