module Typertext.Http {
    export class HttpUrl {
        private _Domain:string;
        private _Path:string;
        private _Port:number;
        private _Protocol:HttpProtocol;
        private _QueryString:{
            [index:string]:string
        };

        public static DefaultPort(protocol:HttpProtocol) {
            return ((protocol == HttpProtocol.http) ? 80 : 443)
        }

        public static FromUrl(location:string):HttpUrl {
            var l = document.createElement("a");
            l.href = location;
            return new HttpUrl(l.hostname, HttpProtocol[l.protocol], l.pathname, HttpUrl.DecodeQueryString(l.search))
        }

        public static DecodeQueryString(queryString:string):HttpQueryString {
            var returnValue:HttpQueryString = {};
            if (queryString.length == 0 || queryString == "?") {
                return returnValue;
            }

            if (queryString.indexOf("?") == 0) {
                queryString = queryString.substring(1);
            }

            var params:string[] = HttpUrl.splitString(queryString, "&");
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

        public static EncodeQueryString(query:HttpQueryString) {
            var rs = "?" + HttpUrl.URLEncodeObject(query);
            return ((rs.length == 1) ? "" : rs);
        }

        public static URLEncodeObject(data:{
            [index:string]:string
        }):string {
            var rs:string = "";
            var temp:string;

            for (temp in data) {
                rs += +encodeURIComponent(temp) + "=" + encodeURIComponent(data[temp]) + "&";
            }

            return rs.slice(0, -1);
        }

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

        constructor(domain:string, protocol:HttpProtocol = HttpProtocol.http, path:string = "/", queryString:{
            [index:string]:string
        } = {}, port:number = 0) {
            if (port < 1 || port > 65535) {
                port = HttpUrl.DefaultPort(protocol);
            }

            if (path.indexOf("/") != 0) {
                path = "/" + path;
            }

            this._Domain = domain;
            this._Protocol = protocol;
            this._Path = path;
            this._QueryString = queryString;
            this._Port = port;
        }


        public ToString():string {
            return HttpProtocol[this._Protocol] + "://" + this._Domain +
                ((this._Port == HttpUrl.DefaultPort(this._Protocol)) ? "" : ":" + this._Port) + this._Path +
                HttpUrl.EncodeQueryString(this._QueryString);
        }
    }
}