import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database pre-update event.
 */
 export default class PreUpdateEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'pre_update';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, public updated?: any, readonly previous?: any) {
        super(PreUpdateEvent.NAME, manager)
    }
}