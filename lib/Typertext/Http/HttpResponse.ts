/**
 * @namespace   Typertext
 * @module      Http
 */
module Typertext.Http {
    export class HttpResponse extends Typertext.GenericResponse<string> {
        /**
         * A class for passing the response around as a raw string
         *
         * @class   HttpResponse
         * @extends GenericResponse
         *
         * @param   {HttpResponseStatus}    status
         * @param   {Function}        responseHeaderGetter
         * @param   {number}                httpResponseCode
         * @param   {string}                responseBody
         *
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         * @constructor
         */
            constructor(status:HttpResponseStatus, responseHeaderGetter?:(input:string)=>string, httpResponseCode?:number, responseBody?:string) {
            super(status, responseHeaderGetter, httpResponseCode, responseBody);
        }
    }
}