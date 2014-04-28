/// <reference path="GenericResponse.ts" />
/// <reference path="GenericResponseHandler.ts" />
/// <reference path="Http/HttpMethod.ts" />
/// <reference path="Http/HttpPostData.ts" />
/// <reference path="Http/HttpUrl.ts" />
/// <reference path="Transport/TransportConstructor.ts" />

/**
 * @module      Typertext
 * @submodule   Http
 * @submodule   Json
 */
module Typertext {
    import HttpMethod = Typertext.Http.HttpMethod;
    import HttpPostData = Typertext.Http.HttpPostData;
    import HttpUrl = Typertext.Http.HttpUrl;
    import TransportConstructor = Typertext.Transport.TransportConstructor;

    /**
     * A class to simplify passing both the status and data of a completed proxy request
     *
     * @interface   GenericRequest
     * @uses        Typertext.Http.HttpMethod
     * @uses        Typertext.Http.HttpPostData
     * @uses        Typertext.Http.HttpUrl
     *
     * @author      Kegan Myers <kegan@keganmyers.com>
     * @version     0.3.0
     */
    export interface GenericRequest<T extends GenericResponseHandler<GenericResponse<any>>> {

        /**
         * A convenience method which will simply use the RawRequest method with a DELETE
         *
         * @param   {HttpUrl}                   request
         * @param   {GenericResponseHandler}    callback
         */
        Delete(request:HttpUrl, callback:T):void;

        /**
         * A convenience method which will simply use the RawRequest method with a GET
         *
         * @param   {HttpUrl}                   request
         * @param   {GenericResponseHandler}    callback
         */
        Get(request:HttpUrl, callback:T):void;

        /**
         * A convenience method which will simply use the RawRequest method with a GET
         *
         * @param   {HttpUrl}                   request
         * @param   {HttpPostData}              postData
         * @param   {GenericResponseHandler}    callback
         */
        Post(request:HttpUrl, postData:HttpPostData, callback:T):void;

        /**
         * A convenience method which will simply use the RawRequest method with a GET
         *
         * @param   {HttpUrl}                   request
         * @param   {HttpPostData}              putData
         * @param   {GenericResponseHandler}    callback
         */
        Put(request:HttpUrl, putData:HttpPostData, callback:T):void;

        /**
         * A method which calls the server and passes returned data to an optionally specified callback
         *
         * @param   {HttpMethid}                method
         * @param   {HttpUrl}                   request
         * @param   {HttpPostData}              postData
         * @param   {GenericResponseHandler}    callback
         * @param   {GenericTransport}          transport
         */
        RawRequest(method:HttpMethod, request:HttpUrl, postData?:HttpPostData, callback?:T, transport?:TransportConstructor):void;
    }
}