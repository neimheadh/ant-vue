import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database post-update event.
 */
export default class PostUpdateEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'post_update';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, public updated?: any, readonly previous?: any) {
        super(PostUpdateEvent.NAME, manager);
    }
}