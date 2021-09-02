import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database pre-delete event.
 */
export default class PreDeleteEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'pre_delete';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, readonly params?: any) {
        super(PreDeleteEvent.NAME, manager);
    }
}