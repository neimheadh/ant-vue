import IDatabaseManager from "../IDatabaseManager";
import ADatabaseEvent from "./ADatabaseEvent";

/**
 * Database pre-schema-update event.
 */
export default class PreSchemaUpdate extends ADatabaseEvent {
    /**
     * Event name.
     */
    static readonly NAME = 'pre_schema_update';

    /**
     * Constructor.
     */
    constructor(manager: IDatabaseManager) {
        super(PreSchemaUpdate.NAME, manager)
    }
}