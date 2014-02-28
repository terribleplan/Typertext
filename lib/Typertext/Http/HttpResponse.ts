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
         * @param   {HttpHeaderData}        responseHeaders
         * @param   {number}                httpResponseCode
         * @param   {string}                responseBody
         *
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         * @constructor
         */
        constructor(status:HttpResponseStatus, responseHeaders?:HttpHeaderData, httpResponseCode?:number, responseBody?:string) {
            super(status, responseHeaders, httpResponseCode, responseBody);
        }
    }
}