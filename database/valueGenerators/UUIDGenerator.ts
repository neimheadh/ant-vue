import { v4 as uuidv4 } from 'uuid';
import IDatabaseValueGenerator from "../IDatabasevalueGenerator";

/**
 * UUID value generator.
 */
export default class UUIDGenerator implements IDatabaseValueGenerator<String> {
    /**
     * {@inheritdoc}
     */
    value(): String {
        return uuidv4();
    }
}