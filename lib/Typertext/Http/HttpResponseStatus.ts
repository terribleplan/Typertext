module Typertext.Http {
    export enum HttpResponseStatus {
        success,
        serverError,
        clientError,
        responseError,
        unknownError,
        timeout
    }
}