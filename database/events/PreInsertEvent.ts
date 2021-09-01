import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database pre-insert event.
 */
 export default class PreInsertEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'pre_insert';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, public inserted?: any) {
        super(PreInsertEvent.NAME, manager)
    }
}