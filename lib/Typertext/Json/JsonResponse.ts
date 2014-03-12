/**
 * @namespace   Typertext
 * @module      Json
 */
module Typertext.Json {
    import HttpResponse = Typertext.Http.HttpResponse;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;

    export class JsonResponse extends Typertext.GenericResponse<JsonObject> {

        /**
         * @property parseSuccess
         * @type {boolean}
         * @private
         */
        private parseSuccess:boolean;

        /**
         * This method handles converting a string into a parsed JSON object
         *
         * @param httpResponse
         * @returns {JsonResponse}
         */
        public static fromHttpResponse(httpResponse:HttpResponse):JsonResponse {
            try {
                return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeader, httpResponse.GetHttpStatus(), window["JSON"].parse(httpResponse.GetContent()), true);
            } catch(e) {
                return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeader, httpResponse.GetHttpStatus(), null);
            }
        }

        /**
         * This method handles creating an unsuccessful JSON response if the content-type is wrong
         *
         * @param httpResponse
         * @returns {JsonResponse}
         */
        public static fromInvalidHttpResponse(httpResponse:HttpResponse):JsonResponse {
                return new JsonResponse(HttpResponseStatus.responseError, httpResponse.GetHeader, httpResponse.GetHttpStatus());
        }

        /**
         * A class that passes around a parsed JSON reponse from the server
         *
         * @class JsonResponse
         * @param   {HttpResponseStatus}    status
         * @param   {HttpHeaderData}        responseHeaders
         * @param   {number}                httpResponseCode
         * @param   {JsonObject}            responseBody
         * @param   {boolean}               parseSuccess
         *
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         */
        constructor(status:HttpResponseStatus, responseHeaderGetter?:(input:string)=>string, httpResponseCode?:number, responseBody?:JsonObject, parseSuccess?:boolean) {
            super(status, responseHeaderGetter, httpResponseCode, responseBody);
            parseSuccess = !!parseSuccess || false;
            this.parseSuccess = parseSuccess;
        }

        /**
         * Check whether the parsing stage of creating creating the JSON response was successful
         *
         * @returns {boolean}
         */
        public GetParseStatus():boolean {
            return this.parseSuccess;
        }
    }
}