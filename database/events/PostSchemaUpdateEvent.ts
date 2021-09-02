import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database post-schema-update event.
 */
export default class PostSchemaUpdate extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'post_schema_update';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager) {
        super(PostSchemaUpdate.NAME, manager)
    }
}