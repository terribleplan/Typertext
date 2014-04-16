module Typertext.Transport {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpUrl = Typertext.Http.HttpUrl;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpResponseHandler = Typertext.Http.HttpResponseHandler;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;
    import HttpResponse = Typertext.Http.HttpResponse;

    export class XHR implements GenericTransport {
        private xhr:XMLHttpRequest;
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

            //Create a XHR
            this.xhr = new XMLHttpRequest();

            //And let us know when it does something
            this.xhr.onreadystatechange = ()=> {
                //If the request is complete
                if (this.xhr.readyState == 4) {
                    //Prepare a getter for the header
                    var getHeader = (name:string):string => {
                        return this.xhr.getResponseHeader(name);
                    };

                    //Check the status
                    if (this.xhr.status == 200) {
                        //And either succeed
                        this.callback(new HttpResponse(HttpResponseStatus.success, getHeader, this.xhr.status, this.xhr.responseText));
                    } else if (this.xhr.status >= 400 && this.xhr.status < 500) {
                        //Or fail miserably
                        this.callback(new HttpResponse(HttpResponseStatus.clientError, getHeader, this.xhr.status, this.xhr.responseText));
                    } else if (this.xhr.status >= 500 && this.xhr.status < 600) {
                        //Again
                        this.callback(new HttpResponse(HttpResponseStatus.serverError, getHeader, this.xhr.status, this.xhr.responseText));
                    } else {
                        //And again
                        this.callback(new HttpResponse(HttpResponseStatus.unknownError, getHeader, this.xhr.status, this.xhr.responseText));
                    }
                }
            };

            //Or if it times out
            this.xhr.ontimeout = () => {
                //And make a big deal of the failing
                this.callback(new HttpResponse(HttpResponseStatus.timeout, (i:string)=>"", -1, ""));
            };
        }

        public Send() {
            //Now connect
            this.xhr.open(HttpMethod[this.method], this.request.ToString(), true);

            //And either send
            if (this.method == HttpMethod.GET) {
                //A get request
                this.xhr.send();
                return;
            }

            //Or set the content-type
            this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //And send the post-data to the server
            this.xhr.send(HttpUrl.UrlEncodeObject(this.postData));
        }

        public Destroy():void {
            this.xhr.onreadystatechange = this.xhr.ontimeout = null;
            this.xhr = null;
        }
    }
}