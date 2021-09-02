import IDatabaseValueGenerator from "../IDatabasevalueGenerator";

/**
 * Current date value generator.
 */
export default class CurrentDateGenerator implements IDatabaseValueGenerator<Date> {
    /**
     * {@inheritdoc}
     */
    value(): Date {
        return new Date();
    }
}