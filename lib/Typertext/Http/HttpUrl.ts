/**
 * @namespace   Typertext
 * @module      Http
 */
module Typertext.Http {
    export class HttpUrl {
        private domain:string;
        private path:string;
        private port:number;
        private protocol:HttpProtocol;
        private queryString:{
            [index:string]:string
        };

        /**
         *
         * @param protocol
         * @returns {number}
         */
        public static DefaultPort(protocol:HttpProtocol) {
            return ((protocol == HttpProtocol.http) ? 80 : 443)
        }

        /**
         * This method takes a URL as a string and decomposes it into a Typertext HttpUrl
         *
         * @param   {string}    location
         * @returns {HttpUrl}
         */
        public static FromUrl(location:string):HttpUrl {
            var l = document.createElement("a");
            l.href = location;
            return new HttpUrl(l.hostname, HttpProtocol[l.protocol], l.pathname, HttpUrl.DecodeQueryString(l.search))
        }

        /**
         * Reads a standard query string (or "search") component and returns it as an object
         *
         * @param   {string}    queryString
         * @returns {HttpQueryString}
         */
        public static DecodeQueryString(queryString:string):HttpQueryString {
            if (queryString.length == 0 || queryString == "?") {
                return {};
            }

            return HttpUrl.UrlDecodeString(queryString);
        }

        /**
         * Reads a Typertext HttpQueryString and converts it to the proper string representations
         *
         * @param   {HttpQueryString}   query
         * @returns {string}
         */
        public static EncodeQueryString(query:HttpQueryString) {
            var rs = "?" + HttpUrl.UrlEncodeObject(query);
            return ((rs.length == 1) ? "" : rs);
        }

        /**
         * Reads any object with string key/value pairs and converts it to a urlencoded string
         *
         * @param data
         * @returns {string}
         */
        public static UrlEncodeObject(data:HttpQueryString):string {
            var rs:string = "";
            var temp:string;

            for (temp in data) {
                rs += encodeURIComponent(temp) + "=" + encodeURIComponent(data[temp]) + "&";
            }

            return rs.slice(0, -1);
        }

        /**
         * Reads any urlencoded string and converts it to a object with string key/value pairs
         *
         * @param   {string}    queryString
         * @returns {HttpQueryString}
         */
        public static UrlDecodeString(queryString:string):HttpQueryString {
            var returnValue:HttpQueryString = {}, params:string[] = HttpUrl.splitString(queryString, "&");
            for (var i:number = 0; i < params.length; i++) {
                var param = HttpUrl.splitString(params[i], "=", 2);
                if (param.length == 1) {
                    returnValue[param[0]] = "";
                    continue;
                }

                returnValue[param[0]] = param[1];
            }

            return returnValue;
        }

        /**
         * Split a string by a string, returning the remainder in the (limit-1)'th index, with no guarantee of object
         * length
         *
         * @param {string}  input
         * @param {string}  separator
         * @param {number}  limit
         * @returns {string[]}
         */
        private static splitString(input:string, separator:string, limit:number = 0):string[] {
            limit++;
            var chunks:string[] = input.split(separator);
            if (limit > 0 && chunks.length > limit) {
                var ret = chunks.splice(0, limit);
                ret.push(chunks.join(separator));
                return ret;
            }
            return chunks;
        }

        /**
         * A common interface for building a URL into something that can easily be decomposed for a client
         *
         * @param {string}          domain
         * @param {HttpProtocol}    protocol
         * @param {string}          path
         * @param {HttpQueryString} queryString
         * @param {number}          port
         *
         * @class HttpUrl
         * @author      Kegan Myers <kegan@keganmyers.com>
         * @version     0.3.1
         * @constructor
         */
        constructor(domain:string, protocol:HttpProtocol = HttpProtocol.http, path:string = "/", queryString:HttpQueryString = {}, port:number = 0) {
            if (port < 1 || port > 65535) {
                port = HttpUrl.DefaultPort(protocol);
            }

            if (path.indexOf("/") != 0) {
                path = "/" + path;
            }

            this.domain = domain;
            this.protocol = protocol;
            this.path = path;
            this.queryString = queryString;
            this.port = port;
        }

        /**
         * Format the current HttpUrl into a standard href/url
         *
         * @returns {string}
         */
        public ToString():string {
            return HttpProtocol[this.protocol] + "://" + this.domain +
                ((this.port == HttpUrl.DefaultPort(this.protocol)) ? "" : ":" + this.port) + this.path +
                HttpUrl.EncodeQueryString(this.queryString);
        }
    }
}