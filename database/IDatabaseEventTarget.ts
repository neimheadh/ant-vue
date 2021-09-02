export default interface IDatabaseEventTarget extends EventTarget {
    /**
     * Indicates the database event target is processing.
     */
    processing: Promise<void>;
}