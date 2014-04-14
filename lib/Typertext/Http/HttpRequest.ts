//TODO add support for IE8-9 CORS via XDomain
//TODO better error handling, ala exceptions

/**
 * @namespace   Typertext
 * @module      Http
 */
module Typertext.Http {
    export class HttpRequest implements Typertext.GenericRequest<HttpResponseHandler> {
        /**
         * The class that everything that calls an http(s) server should use and build on top of using callbacks
         *
         * @class   HttpRequest
         * @extends GenericRequest
         *
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.0
         * @constructor
         */
            constructor() {
        }

        /**
         * A convenience method for simply calling a GET
         *
         * @param   {HttpUrl}               request
         * @param   {HttpResponseHandler}   callback
         */
        public Get(request:HttpUrl, callback:HttpResponseHandler):void {
            this.RawRequest(HttpMethod.GET, request, {}, callback);
        }

        /**
         * A convenience method for simply calling a POST
         *
         * @param   {HttpUrl}               request
         * @param   {HttpPostData}          postData
         * @param   {HttpResponseHandler}   callback
         */
        public Post(request:HttpUrl, postData:HttpPostData, callback:HttpResponseHandler):void {
            this.RawRequest(HttpMethod.POST, request, postData, callback);
        }

        /**
         * This is a method that calls against a specified HTTP server and does basic handling of responses, with no
         * data manipulation
         *
         * @param   {HttpMethod}            method
         * @param   {HttpUrl}               request
         * @param   {HttpPostData}          postData
         * @param   {HttpResponseHandler}   callback
         */
        public RawRequest(method:HttpMethod, request:HttpUrl, postData:HttpPostData = {}, callback:HttpResponseHandler = (c)=> {
        }):void {
            Typertext.Transport.TransportChooser.Transport(method, request, postData, callback);
        }
    }
}