/**
 * @namespace   Typertext
 * @module      Json
 */
module Typertext.Json {
    import HttpResponse = Typertext.Http.HttpResponse;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;

    export class JsonResponse extends Typertext.GenericResponse<JsonObject> {

        /**
         * This method handles converting a string into a parsed JSON object
         *
         * @param httpResponse
         * @returns {JsonResponse}
         */
        public static fromHttpResponse(httpResponse:HttpResponse):JsonResponse {
            return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeader, httpResponse.GetHttpStatus(), window["JSON"].parse(httpResponse.GetContent()));
        }

        /**
         * A class that passes around a parsed JSON reponse from the server
         *
         * @class JsonResponse
         * @param   {HttpResponseStatus}    status
         * @param   {HttpHeaderData}        responseHeaders
         * @param   {number}                httpResponseCode
         * @param   {JsonObject}            responseBody
         *
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         */
        constructor(status:HttpResponseStatus, responseHeaderGetter?:(input:string)=>string, httpResponseCode?:number, responseBody?:JsonObject) {
            super(status, responseHeaderGetter, httpResponseCode, responseBody);
        }
    }
}