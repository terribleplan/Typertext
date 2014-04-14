module Typertext.Transport {
    export class TransportChooser {
        static Transport(method:Typertext.Http.HttpMethod, request:Typertext.Http.HttpUrl, postData:Typertext.Http.HttpPostData, callback:Typertext.Http.HttpResponseHandler):GenericTransport {
            var ieLte9 = false;
            var isXdomain = false;
            var isXprotocol = false;

            if (!ieLte9) {
                return new XDR(method, request, postData, callback);
            } else if (isXdomain && !isXprotocol) {
                return new XHR(method, request, postData, callback);
            }

            throw {};
        }
    }
}