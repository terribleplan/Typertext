/**
 * @namespace   Typertext
 * @module      Json
 */
module Typertext.Json {
    import HttpResponse = Typertext.Http.HttpResponse;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;
    import HttpHeaderData = Typertext.Http.HttpHeaderData;

    export class JsonResponse extends Typertext.GenericResponse<JsonObject> {

        /**
         * This method handles converting a string into a parsed JSON object
         *
         * @param httpResponse
         * @returns {JsonResponse}
         */
        public static fromHttpResponse(httpResponse:HttpResponse):JsonResponse {
            return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeaders(), httpResponse.GetHttpStatus(), window["JSON"].parse(httpResponse.GetContent()));
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
        constructor(status:HttpResponseStatus, responseHeaders?:HttpHeaderData, httpResponseCode?:number, responseBody?:JsonObject) {
            super(status, responseHeaders, httpResponseCode, responseBody);
        }
    }
}