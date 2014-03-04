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
            var noop = (i:string)=>{
                return "";
            };

            //Create a XHR
            var xhr = new XMLHttpRequest();

            //And let us know when it does something
            xhr.onreadystatechange = ()=> {
                //If the request is complete
                if (xhr.readyState == 4) {
                    //Prepare a getter for the header
                    var getHeader = (name:string):string => {
                        return xhr.getResponseHeader(name);
                    };

                    //Check the status
                    if (xhr.status == 200) {
                        //And either succeed
                        callback(new HttpResponse(HttpResponseStatus.success, getHeader, xhr.status, xhr.responseText));
                    } else if (xhr.status >= 400 && xhr.status < 500) {
                        //Or fail miserably
                        throw new HttpException("The server returned an error response state", xhr.status, new HttpResponse(HttpResponseStatus.clientError, getHeader, xhr.status, xhr.responseText));
                    } else if (xhr.status >= 500 && xhr.status < 600) {
                        //Again
                        throw new HttpException("The server returned an error response state", xhr.status, new HttpResponse(HttpResponseStatus.serverError, getHeader, xhr.status, xhr.responseText));
                    } else {
                        //And again
                        throw new HttpException("An unknown error has occurred", -2, new HttpResponse(HttpResponseStatus.unknownError, getHeader, xhr.status, xhr.responseText));
                    }
                }
            };

            //Or if it times out
            xhr.ontimeout = () => {
                //And make a big deal of the failing
                throw new HttpException("The server took too long to respond to our request", -1, new HttpResponse(HttpResponseStatus.timeout, noop, -1, ""));
            };

            //Now connect
            xhr.open(HttpMethod[method], request.ToString(), true);

            //And either send
            if (method == HttpMethod.GET) {
                //A get request
                xhr.send();
                return;
            }

            //Or set the content-type
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //And send the post-data to the server
            xhr.send(HttpUrl.UrlEncodeObject(postData));
        }
    }
}