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

        public static EncodeQueryString(query:{
            [index:string]:string
        }) {
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