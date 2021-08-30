import DatabaseFieldType from './DatabaseFieldType';
import IDatabaseValueGenerator from "./IDatabasevalueGenerator";

/**
 * A database field.
 */
export default interface IDatabaseField {
    /**
     * Value generator.
     */
    readonly generator?: IDatabaseValueGenerator<any>;

    /**
     * Field name.
     */
    readonly name: string;

    /**
     * Field type.
     */
    readonly type?: DatabaseFieldType;
}