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
        private queryString:HttpQueryString;

        /**
         *
         * @param protocol
         * @returns {number}
         */
        public static DefaultPort(protocol:HttpProtocol) {
            switch(protocol) {
                case HttpProtocol.http:
                    return 80;
                case HttpProtocol.https:
                    return 443;
                default:
                    return -1;
            }
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
            if (!l.hostname || !l.protocol || !l.pathname || !l.search || !l.port) {
                //This may seem silly, but it is serious business for IE and relative URLs
                //noinspection SillyAssignmentJS
                l.href = l.href;
            }
            return new HttpUrl(l.hostname, HttpProtocol[l.protocol.slice(0,-1)], l.pathname, HttpUrl.DecodeQueryString(l.search), parseInt(l.port))
        }

        /**
         * Reads a standard query string (or "search") component and returns it as an object
         *
         * @param   {string}    queryString
         * @returns {HttpQueryString}
         */
        public static DecodeQueryString(queryString:string):HttpQueryString {
            if (queryString.indexOf("?") == 0) {
                queryString = queryString.substring(1);
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
                var cur = data[temp];

                if (typeof cur !== "object" && typeof cur !== "function") {
                    rs += encodeURIComponent(temp) + "=" + encodeURIComponent(cur) + "&";
                    continue;
                }

                if (cur instanceof Array) {
                    for (var i = 0; i < cur.length; i++) {
                        if (typeof cur[i] === "object" && typeof cur[i] !== "function") {
                            continue;
                        }

                        rs += encodeURIComponent(temp) + "=" + encodeURIComponent(cur[i]) + "&";
                    }
                }
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
                if (params[i] == "") {
                    continue;
                }

                var param = HttpUrl.splitString(params[i], "=", 2);
                var key = decodeURIComponent(param[0]);
                if (param.length == 1) {
                    returnValue[key] = "";
                    continue;
                }

                returnValue[key] = decodeURIComponent(param[1]);
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
        private static splitString(input:string, separator:string, limit:number = -1):string[] {
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
            if (port < 1 || port > 65535 || isNaN(port)) {
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

        /**
         * Return the port number that this url uses
         *
         * @returns {number}
         */
        public GetPort():number {
            return this.port;
        }

        /**
         * Return the domain that this url uses
         *
         * @returns {string}
         */
        public GetDomain():string {
            return this.domain;
        }

        /**
         * Return the protocol that this url uses
         *
         * @returns {HttpProtocol}
         */
        public GetProtocol():HttpProtocol {
            return this.protocol;
        }

        /**
         * Return whether or not a given URL is in the same domain
         *
         * @returns {boolean}
         */
        public SameOriginCheck(url:HttpUrl):boolean {
            return (this.domain === url.GetDomain() && this.port === url.GetPort() && this.protocol === url.GetProtocol());
        }
    }
}