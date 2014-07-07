/// <reference path="HttpResponseHandler.ts" />
/// <reference path="../GenericRequest.ts" />
/// <reference path="../Transport/TransportConstructor.ts" />
/// <reference path="../Transport/GenericTransport.ts" />
/// <reference path="../Transport/TransportChooser.ts" />

/**
 * @namespace   Typertext
 * @module      Http
 */
module Typertext.Http {
    import GenericTransport = Typertext.Transport.GenericTransport;
    import TransportChooser = Typertext.Transport.TransportChooser;
    import TransportConstructor = Typertext.Transport.TransportConstructor;

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
         * A convenience method for simply calling a DELETE
         *
         * @param   {HttpUrl}               request
         * @param   {HttpResponseHandler}   callback
         */
        public Delete(request:HttpUrl, callback:HttpResponseHandler):void {
            this.RawRequest(HttpMethod.PUT, request, {}, callback);
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
         * A convenience method for simply calling a PUT
         *
         * @param   {HttpUrl}               request
         * @param   {HttpPostData}          putData
         * @param   {HttpResponseHandler}   callback
         */
        public Put(request:HttpUrl, putData:HttpPostData, callback:HttpResponseHandler):void {
            this.RawRequest(HttpMethod.PUT, request, putData, callback);
        }

        /**
         * This is a method that calls against a specified HTTP server and does basic handling of responses, with no
         * data manipulation
         *
         * @param   {HttpMethod}            method
         * @param   {HttpUrl}               request
         * @param   {HttpPostData}          postData
         * @param   {HttpResponseHandler}   callback
         * @param   {GenericTransport}      transport
         */
        public RawRequest(method:HttpMethod, request:HttpUrl, postData:HttpPostData = {}, callback?:HttpResponseHandler, transport?:TransportConstructor):void {
            if (!callback)
                callback = (c)=> null;

            if (!transport)
                transport = TransportChooser.Transport(method, request, postData, callback);

            //This is guaranteed to return a GenericTransport, but PhpStorm isn't so sure
            var transportInstance:GenericTransport = <GenericTransport> new transport(method, request, postData, callback);
            transportInstance.Send();
        }
    }
}