/**
 * @namespace   Typertext
 * @module      Http
 */
module Typertext.Http {
    /**
     * @interface HttpQueryString
     *
     * Although it appears that this can provide any type of value, implementations
     * are allowed to disregard types they are unable to handle.
     */
    export interface HttpQueryString {
        [index:string]:any
    }
}