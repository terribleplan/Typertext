/**
 * @namespace   Typertext
 * @module      Transport
 */
module Typertext.Transport {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpUrl = Typertext.Http.HttpUrl
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpResponseHandler = Typertext.Http.HttpResponseHandler;

    export class TransportChooser {
        /**
         *
         * @param   {HttpMethod}            method
         * @param   {HttpUrl}               request
         * @param   {HttpPostData}          postData
         * @param   {HttpResponseHandler}   callback
         * @returns {GenericTransport}
         */
        static Transport(method:HttpMethod, request:HttpUrl, postData:HttpPostData, callback:HttpResponseHandler):TransportConstructor {
            //Prepare to test if we are in IE
            var ieTestDiv = document.createElement("div");
            ieTestDiv.innerHTML = "<!--[if lte IE 7]><i></i><![endif]-->";

            if (ieTestDiv.getElementsByTagName("i").length === 1) {
                //There is currently no supported transport for IE lte 7
                throw {};
            }

            //Now test how we should proceed normally
            ieTestDiv.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->";
            var ieLte9 = (ieTestDiv.getElementsByTagName("i").length === 1);
            var origin = HttpUrl.FromUrl(window.location.href);

            //If this is a CORS request in a modern browser
            if (!origin.CrossOriginCheck(origin) || !ieLte9) {
                //Just use a standard XHR request
                return XHR;
            }

            //Otherwise if we aren't cross protocol
            if (origin.GetProtocol() === request.GetProtocol()) {
                //Use IE's silly XDomainRequest
                return XDR;
            }

            //Otherwise there is no supported transport
            throw {};
        }
    }
}