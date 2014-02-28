/**
 * @module      Typertext
 * @submodule   Http
 * @submodule   Json
 */
module Typertext {
    import HttpHeaderData = Typertext.Http.HttpHeaderData;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;

    export class GenericResponse<T> {
        private status:HttpResponseStatus;
        private headers:HttpHeaderData;
        private httpStatus:number;
        private content:T;

        /**
         * A common way to specify a response that gets passed between classes and eventually returned to the user
         *
         * @class       GenericResponse
         * @uses        Typertext.Http.HttpHeaderData
         * @uses        Typertext.Http.HttpResponseStatus
         *
         * @param       {HttpResponseStatus}    status
         * @param       {HttpHeaderData}        responseHeaders
         * @param       {number}                httpResponseCode
         * @param       {T}                     responseBody
         * @constructor
         *
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         */
        constructor(status:HttpResponseStatus, responseHeaders?:HttpHeaderData, httpResponseCode?:number, responseBody?:T) {
            this.status = status;
            this.headers = responseHeaders;
            this.httpStatus = httpResponseCode;
            this.content = responseBody;
        }

        /**
         * Accessor method
         *
         * @returns {T}
         */
        public GetContent():T {
            return this.content;
        }

        /**
         * Accessor method
         *
         * @returns {string}
         * @constructor
         */
        public GetContentType():string {
            return this.GetHeaders()["Content-Type"];
        }

        /**
         * Accessor method
         *
         * @returns {HttpHeaderData}
         * @constructor
         */
        public GetHeaders():HttpHeaderData {
            return this.headers;
        }

        /**
         * Accessor method
         *
         * @returns {number}
         * @constructor
         */
        public GetHttpStatus():number {
            return this.httpStatus;
        }

        /**
         * Accessor method
         *
         * @returns {HttpResponseStatus}
         * @constructor
         */
        public GetStatus():HttpResponseStatus {
            return this.status;
        }
    }
}