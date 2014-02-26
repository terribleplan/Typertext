//TODO add support for IE8-9 CORS via XDomain
//TODO better error handling, ala exceptions

module Typertext.Http {
    export class HttpRequest implements Typertext.GenericRequest<HttpResponseHandler> {
        private static parseHeaderString(headerStr:string):HttpHeaderData {
            var headers:HttpHeaderData = {},
                headerPairs:string[] = headerStr.split('\u000d\u000a');
            for (var i:number = 0; i < headerPairs.length; i++) {
                var headerPair:string = headerPairs[i],
                    index:number = headerPair.indexOf('\u003a\u0020');
                if (index > 0) {
                    var key:string = headerPair.substring(0, index);
                    headers[key] = headerPair.substring(index + 2);
                }
            }
            return headers;
        }

        constructor() {
        }

        public Get(request:HttpUrl, callback:HttpResponseHandler):void {
            this.RawRequest(HttpMethod.GET, request, {}, callback);
        }

        public Post(request:HttpUrl, postData:HttpPostData, callback:HttpResponseHandler):void {
            this.RawRequest(HttpMethod.GET, request, postData, callback);
        }

        public RawRequest(method:HttpMethod, request:HttpUrl, postData:HttpPostData = {}, callback:HttpResponseHandler = (c)=> {
        }):void {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=> {
                //Once the request completes
                if (xhr.readyState == 4) {
                    var headers:HttpHeaderData = HttpRequest.parseHeaderString(xhr.getAllResponseHeaders());
                    if (xhr.status == 200) {
                        callback(new HttpResponse(HttpResponseStatus.success, headers, xhr.status, xhr.responseText));

                    } else if (xhr.status >= 400 && xhr.status < 500) {
                        //TODO generate a client error callback
                        throw new HttpException("Error type is unimplemented", -1, HttpResponseStatus.clientError);

                    } else if (xhr.status >= 500 && xhr.status < 600) {
                        //TODO generate a server error callback
                        throw new HttpException("Error type is unimplemented", -1, HttpResponseStatus.serverError);

                    } else {
                        throw new HttpException("An unknown error has occurred", -2, HttpResponseStatus.unknownError);
                    }
                }
            };

            xhr.ontimeout = () => {
                callback(new HttpResponse(HttpResponseStatus.timeout));
            };

            xhr.open(HttpMethod[method], request.ToString(), true);

            if (method == HttpMethod.GET) {
                xhr.send();
                return;
            }

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(HttpUrl.UrlEncodeObject(postData));
        }
    }
}