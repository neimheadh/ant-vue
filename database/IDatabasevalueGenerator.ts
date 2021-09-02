
/**
 * Database value generator.
 */
export default interface IDatabaseValueGenerator<T> {
    /**
     * Get the generated value.
     */
    value(): T;
}