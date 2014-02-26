/**
 * Created by kegan on 2/26/14.
 */
module Typertext.Json {
    export class JsonResponse extends Typertext.GenericResponse<JsonObject> {
        public static fromHttpResponse(httpResponse:Typertext.Http.HttpResponse):JsonResponse {
            return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeaders(), httpResponse.GetHttpStatus(), window["JSON"].parse(httpResponse.GetContent()));
        }

        constructor(status:Typertext.Http.HttpResponseStatus, responseHeaders?:Typertext.Http.HttpHeaderData, httpResponseCode?:number, responseBody?:JsonObject) {
            super(status, responseHeaders, httpResponseCode, responseBody);
        }
    }
}