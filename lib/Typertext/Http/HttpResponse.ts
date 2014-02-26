module Typertext.Http {
    export class HttpResponse extends Typertext.GenericResponse<string> {
        constructor(status:HttpResponseStatus, responseHeaders?:HttpHeaderData, httpResponseCode?:number, responseBody?:string) {
            super(status, responseHeaders, httpResponseCode, responseBody);
        }
    }
}