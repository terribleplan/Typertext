module Typertext.Transport {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpUrl = Typertext.Http.HttpUrl;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpResponseHandler = Typertext.Http.HttpResponseHandler;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;
    import HttpResponse = Typertext.Http.HttpResponse;

    export class XDR implements GenericTransport {
        private xdr:XDomainRequest;
        private postData: HttpPostData;
        private method:HttpMethod;
        private request:HttpUrl;
        private callback:HttpResponseHandler;

        constructor(method:HttpMethod, request:HttpUrl, postData:HttpPostData = {}, callback:HttpResponseHandler = (c)=> null) {
            //Store the request information
            this.postData = postData;
            this.method = method;
            this.request = request;
            this.callback = callback;
            //Create a XDR
            this.xdr = new XDomainRequest();
        }

        Send():void {
            //and an interface to get the content type of the response
            var getHeader = (name:string):string => {
                if (name.toLowerCase() === "content-type") {
                    return this.xdr.contentType;
                }
                return undefined;
            };

            //Now to handle timeouts,
            this.xdr.ontimeout = () => {
                this.callback(new HttpResponse(HttpResponseStatus.timeout, (i:string)=>"", -1, ""));
            };

            //all errors (because XDR sucks),
            this.xdr.onerror = () => {
                this.callback(new HttpResponse(HttpResponseStatus.unknownError, getHeader, -1, this.xdr.responseText));
            };

            //successes,
            this.xdr.onload = () => {
                this.callback(new HttpResponse(HttpResponseStatus.success, getHeader, 200, this.xdr.responseText));
            };

            //and even more stupidity (because XDR REALLY sucks).
            this.xdr.onprogress = () => null;

            //Finally, open the request
            this.xdr.open(HttpMethod[this.method], this.request.ToString());

            //and either send
            if (this.method == HttpMethod.GET) {
                //a get request without data,
                this.xdr.send();
                return;
            }

            //or send the post-data to the server (as text/plain, because XDR sucks)
            this.xdr.send(HttpUrl.UrlEncodeObject(this.postData));
        }

        Destroy():void {
            this.xdr.ontimeout = this.xdr.onerror = this.xdr.onload = this.xdr.onprogress = null;
            this.xdr = null;
        }
    }
}