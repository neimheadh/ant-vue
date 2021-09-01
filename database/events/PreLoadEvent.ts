import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database pre-load event.
 */
export default class PreLoadEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'pre_load';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, readonly params?: any) {
        super(PreLoadEvent.NAME, manager);
    }
}