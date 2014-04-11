module Typertext.Transport {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpUrl = Typertext.Http.HttpUrl;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpResponseHandler = Typertext.Http.HttpResponseHandler;

    export interface GenericTransport {
        RawRequest(method:HttpMethod, request:HttpUrl, postData:HttpPostData, callback:HttpResponseHandler):void;
    }
}