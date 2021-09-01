import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database post-insert event.
 */
export default class PostInsertEvent extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'post_insert';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager, readonly inserted?: any) {
        super(PostInsertEvent.NAME, manager)
    }
}