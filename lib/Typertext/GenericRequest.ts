//TODO comment everything

module Typertext {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpResponseHandler = Typertext.Http.HttpResponseHandler;
    import HttpUrl = Typertext.Http.HttpUrl;

    export interface GenericRequest<T extends GenericResponseHandler<GenericResponse<any>>> {
        Get(request:HttpUrl, callback:T):void;

        Post(request:HttpUrl, postData:HttpPostData, callback:T):void;

        RawRequest(method:HttpMethod, request:HttpUrl, postData?:HttpPostData, callback?:T):void;
    }
}