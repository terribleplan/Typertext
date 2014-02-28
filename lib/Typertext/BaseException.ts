/**
 * @module      Typertext
 * @submodule   Http
 * @submodule   Json
 */
module Typertext {
    export class BaseException<T> {
        private code:number;
        private custom:T;
        private message:string;

        /**
         * A simple utility class to provide a defined way to pass exceptions occurring within Typertext
         *
         * @param {string}  message
         * @param {number}  code
         * @param {T}       custom
         * @constructor
         */
        constructor(message:string, code:number, custom:T) {
            this.message = message;
            this.code = code;
            this.custom = custom;
        }

        /**
         * Accessor method
         *
         * @returns {number}
         */
        public GetCode():number {
            return this.code;
        }

        /**
         * Accessor method
         *
         * @returns {string}
         */
        public GetMessage():string {
            return this.message;
        }

        /**
         * Accessor method
         *
         * @returns {T}
         */
        public GetCustom():T {
            return this.custom;
        }
    }
}