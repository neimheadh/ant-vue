import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database post-delete event.
 */
export default class PostDelete extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'post_delete';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, readonly deleted?: any) {
        super(PostDelete.NAME, manager);
    }
}