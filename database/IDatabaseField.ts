import DatabaseFieldType from './DatabaseFieldType';
import IDatabaseTableLink from './IDatabaseTableLink';
import IDatabaseValueGenerator from "./IDatabasevalueGenerator";

/**
 * A database field.
 */
export default interface IDatabaseField {
    /**
     * Default value.
     */
    readonly default?: any;

    /**
     * Value generator.
     */
    readonly generator?: IDatabaseValueGenerator<any>;

    /**
     * Field table link.
     */
    readonly link?: IDatabaseTableLink;

    /**
     * Field name.
     */
    readonly name: string;

    /**
     * Field type.
     */
    readonly type?: DatabaseFieldType;
}