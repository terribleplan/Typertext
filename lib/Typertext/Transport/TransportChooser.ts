module Typertext.Transport {
    export class TransportChooser {
        static GetTransport(method:Typertext.Http.HttpMethod, request:Typertext.Http.HttpUrl):GenericTransport {
            var ieLte9 = false;
            var isXdomain = false;
            var isXprotocol = false;

            if (!ieLte9) {
                return new XDR();
            } else if (isXdomain && !isXprotocol) {
                return new XHR();
            }

            throw {};
        }
    }
}