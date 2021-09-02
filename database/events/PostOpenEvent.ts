import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database post-database open event.
 */
 export default class PostOpen extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'post_open';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager) {
        super(PostOpen.NAME, manager)
    }
}