module Typertext.Transport {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpUrl = Typertext.Http.HttpUrl;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpResponseHandler = Typertext.Http.HttpResponseHandler;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;
    import HttpResponse = Typertext.Http.HttpResponse;

    export class XDR extends GenericTransport {
        constructor(method:HttpMethod, request:HttpUrl, postData:HttpPostData = {}, callback:HttpResponseHandler = (c)=> null) {
            super(method, request, postData, callback);

            //Create a XDR
            var xdr = new XDomainRequest();

            //and an interface to get the content type of the response
            var getHeader = (name:string):string => {
                if (name.toLowerCase() === "content-type") {
                    return xdr.contentType;
                }
                return undefined;
            };

            //No handle timeouts,
            xdr.ontimeout = () => {
                callback(new HttpResponse(HttpResponseStatus.timeout, (i:string)=>"", -1, ""));
            };

            //all errors (because XDR sucks)
            xdr.onerror = () => {
                callback(new HttpResponse(HttpResponseStatus.unknownError, getHeader, -1, xdr.responseText));
            };

            //and success.
            xdr.onload = () => {
                callback(new HttpResponse(HttpResponseStatus.success, getHeader, 200, xdr.responseText));
            };

            //Finally, open the request
            xdr.open(HttpMethod[method], request.ToString());

            //and either send
            if (method == HttpMethod.GET) {
                //a get request without data,
                xdr.send();
                return;
            }

            //or send the post-data to the server (as text/plain, because XDR sucks)
            xdr.send(HttpUrl.UrlEncodeObject(postData));
        }
    }
}