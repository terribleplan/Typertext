declare module Typertext {
    class BaseException<T> {
        private code;
        private custom;
        private message;
        constructor(message: string, code: number, custom: T);
        public GetCode(): number;
        public GetMessage(): string;
        public GetCustom(): T;
    }
}
declare module Typertext {
    interface GenericRequest<T extends GenericResponseHandler<GenericResponse<any>>> {
        Get(request: Http.HttpUrl, callback: T): void;
        Post(request: Http.HttpUrl, postData: Http.HttpPostData, callback: T): void;
        RawRequest(method: Http.HttpMethod, request: Http.HttpUrl, postData?: Http.HttpPostData, callback?: T): void;
    }
}
declare module Typertext {
    class GenericResponse<T> {
        private status;
        private headers;
        private httpStatus;
        private content;
        constructor(status: Http.HttpResponseStatus, responseHeaderGetter?: (input: string) => string, httpResponseCode?: number, responseBody?: T);
        public GetContent(): T;
        public GetContentType(): string;
        public GetHeader(name: string): string;
        public GetHttpStatus(): number;
        public GetStatus(): Http.HttpResponseStatus;
    }
}
declare module Typertext {
    interface GenericResponseHandler<T extends GenericResponse<any>> {
        (response: T): void;
    }
}
declare module Typertext.Http {
    class HttpException extends BaseException<HttpResponseStatus> {
    }
}
declare module Typertext.Http {
    enum HttpMethod {
        GET = 0,
        POST = 1,
    }
}
declare module Typertext.Http {
    interface HttpPostData {
        [index: string]: string;
    }
}
declare module Typertext.Http {
    enum HttpProtocol {
        http = 0,
        https = 1,
    }
}
declare module Typertext.Http {
    interface HttpQueryString {
        [index: string]: string;
    }
}
declare module Typertext.Http {
    class HttpRequest implements GenericRequest<HttpResponseHandler> {
        constructor();
        public Get(request: HttpUrl, callback: HttpResponseHandler): void;
        public Post(request: HttpUrl, postData: HttpPostData, callback: HttpResponseHandler): void;
        public RawRequest(method: HttpMethod, request: HttpUrl, postData?: HttpPostData, callback?: HttpResponseHandler): void;
    }
}
declare module Typertext.Http {
    class HttpResponse extends GenericResponse<string> {
        constructor(status: HttpResponseStatus, responseHeaderGetter?: (input: string) => string, httpResponseCode?: number, responseBody?: string);
    }
}
declare module Typertext.Http {
    interface HttpResponseHandler extends GenericResponseHandler<HttpResponse> {
    }
}
declare module Typertext.Http {
    enum HttpResponseStatus {
        success = 0,
        serverError = 1,
        clientError = 2,
        responseError = 3,
        unknownError = 4,
        timeout = 5,
    }
}
declare module Typertext.Http {
    class HttpUrl {
        private domain;
        private path;
        private port;
        private protocol;
        private queryString;
        static DefaultPort(protocol: HttpProtocol): number;
        static FromUrl(location: string): HttpUrl;
        static DecodeQueryString(queryString: string): HttpQueryString;
        static EncodeQueryString(query: HttpQueryString): string;
        static UrlEncodeObject(data: HttpQueryString): string;
        static UrlDecodeString(queryString: string): HttpQueryString;
        private static splitString(input, separator, limit?);
        constructor(domain: string, protocol?: HttpProtocol, path?: string, queryString?: HttpQueryString, port?: number);
        public ToString(): string;
    }
}
declare module Typertext.Json {
    class JsonException extends BaseException<void> {
        constructor(message: string, code: number);
    }
}
declare module Typertext.Json {
    interface JsonObject {
        [index: string]: any;
    }
}
declare module Typertext.Json {
    class JsonRequest implements GenericRequest<JsonResponseHandler> {
        private jsonType;
        private request;
        constructor(jsonContentType?: string);
        public Get(request: Http.HttpUrl, callback: JsonResponseHandler): void;
        public Post(request: Http.HttpUrl, postData: Http.HttpPostData, callback: JsonResponseHandler): void;
        public RawRequest(method: Http.HttpMethod, request: Http.HttpUrl, postData?: Http.HttpPostData, callback?: JsonResponseHandler): void;
    }
}
declare module Typertext.Json {
    class JsonResponse extends GenericResponse<JsonObject> {
        static fromHttpResponse(httpResponse: Http.HttpResponse): JsonResponse;
        constructor(status: Http.HttpResponseStatus, responseHeaderGetter?: (input: string) => string, httpResponseCode?: number, responseBody?: JsonObject);
    }
}
declare module Typertext.Json {
    interface JsonResponseHandler extends GenericResponseHandler<JsonResponse> {
    }
}
