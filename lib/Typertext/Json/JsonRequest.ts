/**
 * @namespace   Typertext
 * @module      Json
 */
module Typertext.Json {
    import HttpRequest = Typertext.Http.HttpRequest;
    import HttpResponse = Typertext.Http.HttpResponse;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;
    import HttpUrl = Typertext.Http.HttpUrl;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpMethod = Typertext.Http.HttpMethod;

    export class JsonRequest implements Typertext.GenericRequest<JsonResponseHandler> {
        private jsonType:string;
        private request:HttpRequest;

        /**
         * A class to simplify passing both the status and data of a completed proxy request
         *
         * @interface   GenericRequest
         * @uses        Typertext.Http.HttpRequest;
         * @uses        Typertext.Http.HttpResponse;
         * @uses        Typertext.Http.HttpResponseStatus;
         * @uses        Typertext.Http.HttpUrl;
         * @uses        Typertext.Http.HttpPostData;
         * @uses        Typertext.Http.HttpMethod;
         *
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         */
        constructor(jsonContentType:string = "application/json") {
            this.request = new HttpRequest();
            this.jsonType = jsonContentType;
        }

        /**
         * A convenience method for simply calling a GET
         *
         * @param   {HttpUrl}               request
         * @param   {JsonResponseHandler}   callback
         */
        public Get(request:HttpUrl, callback:JsonResponseHandler):void {
            this.RawRequest(HttpMethod.GET, request, {}, callback);
        }

        /**
         * A convenience method for simply calling a POST
         *
         * @param   {HttpUrl}               request
         * @param   {HttpPostData}          postData
         * @param   {JsonResponseHandler}   callback
         */
        public Post(request:HttpUrl, postData:HttpPostData, callback:JsonResponseHandler):void {
            this.RawRequest(HttpMethod.GET, request, postData, callback);
        }

        /**
         * A layer to automatically decode a response into a JSON object
         *
         * @param   {HttpMethod}            method
         * @param   {HttpUrl}               request
         * @param   {HttpPostData}          postData
         * @param   {JsonResponseHandler}   callback
         */
        public RawRequest(method:HttpMethod, request:HttpUrl, postData:Typertext.Http.HttpPostData = {}, callback:JsonResponseHandler = (c)=> {
        }) {
            this.request.RawRequest(method, request, postData, (response:HttpResponse)=> {
                //Make sure that we got the Json content type we are expecting
                if (response.GetContentType() != this.jsonType) {
                    callback(new JsonResponse(HttpResponseStatus.responseError));
                }

                try {
                    callback(JsonResponse.fromHttpResponse(response));
                } catch (e) {
                    throw new JsonException("Json parse exception", -1);
                }
            });
        }
    }
}