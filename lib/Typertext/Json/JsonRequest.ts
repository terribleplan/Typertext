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

        constructor(jsonContentType:string = "application/json") {
            this.request = new HttpRequest();
            this.jsonType = jsonContentType;
        }

        public Get(request:HttpUrl, callback:JsonResponseHandler):void {
            this.RawRequest(HttpMethod.GET, request, {}, callback);
        }

        public Post(request:HttpUrl, postData:HttpPostData, callback:JsonResponseHandler):void {
            this.RawRequest(HttpMethod.GET, request, postData, callback);
        }

        public RawRequest(method:Typertext.Http.HttpMethod, request:HttpUrl, postData:Typertext.Http.HttpPostData = {}, callback:JsonResponseHandler = (c)=> {
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