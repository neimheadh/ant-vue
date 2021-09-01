import IDatabaseManager from "./IDatabaseManager";

/**
 * Database event.
 */
export default interface IDatabaseEvent extends Event {
    /**
     * Database manager.
     */
    readonly manager: IDatabaseManager;
}