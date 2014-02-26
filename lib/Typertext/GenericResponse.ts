module Typertext {
    import HttpHeaderData = Typertext.Http.HttpHeaderData;
    import HttpResponseStatus = Typertext.Http.HttpResponseStatus;

    export class GenericResponse<T> {
        private status:HttpResponseStatus;
        private headers:HttpHeaderData;
        private httpStatus:number;
        private content:T;

        constructor(status:HttpResponseStatus, responseHeaders?:HttpHeaderData, httpResponseCode?:number, responseBody?:T) {
            this.status = status;
            this.headers = responseHeaders;
            this.httpStatus = httpResponseCode;
            this.content = responseBody;
        }

        public GetContent():T {
            return this.content;
        }

        public GetContentType():string {
            return this.GetHeaders()["Content-Type"];
        }

        public GetHeaders():HttpHeaderData {
            return this.headers;
        }

        public GetHttpStatus():number {
            return this.httpStatus;
        }

        public GetStatus():HttpResponseStatus {
            return this.status;
        }

        public SetContent(content:T):void {
            this.content = content;
        }
    }
}