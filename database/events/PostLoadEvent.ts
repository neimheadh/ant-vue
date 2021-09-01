import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database post-load event.
 */
export default class PostLoadEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'post_load';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, public loaded?: any) {
        super(PostLoadEvent.NAME, manager);
    }
}