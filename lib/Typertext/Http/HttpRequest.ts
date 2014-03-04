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
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=> {
                //Once the request completes
                if (xhr.readyState == 4) {
                    var getHeader = (name:string):string => {
                        return xhr.getResponseHeader(name);
                    };
                    if (xhr.status == 200) {
                        callback(new HttpResponse(HttpResponseStatus.success, getHeader, xhr.status, xhr.responseText));

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