/**
 * @namespace   Typertext
 * @module      Json
 */
module Typertext.Json {
    export class JsonException extends Typertext.BaseException<void> {
        /**
         * The exception that will be raised when a problem has occurred in the Json module
         *
         * @param {string}  message
         * @param {number}  code
         *
         * @class JsonException
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         * @constructor
         */
        constructor(message:string, code:number) {
            super(message, code, null);
        }
    }
}