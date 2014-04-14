module Typertext.Transport {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpUrl = Typertext.Http.HttpUrl;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpResponseHandler = Typertext.Http.HttpResponseHandler;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;
    import HttpResponse = Typertext.Http.HttpResponse;

    export class XHR extends GenericTransport {
        constructor(method:HttpMethod, request:HttpUrl, postData:HttpPostData = {}, callback:HttpResponseHandler = (c)=> null) {
            super(method, request, postData, callback);

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
                        callback(new HttpResponse(HttpResponseStatus.clientError, getHeader, xhr.status, xhr.responseText));
                    } else if (xhr.status >= 500 && xhr.status < 600) {
                        //Again
                        callback(new HttpResponse(HttpResponseStatus.serverError, getHeader, xhr.status, xhr.responseText));
                    } else {
                        //And again
                        callback(new HttpResponse(HttpResponseStatus.unknownError, getHeader, xhr.status, xhr.responseText));
                    }
                }
            };

            //Or if it times out
            xhr.ontimeout = () => {
                //And make a big deal of the failing
                callback(new HttpResponse(HttpResponseStatus.timeout, (i:string)=>"", -1, ""));
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