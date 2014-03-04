var Typertext;
(function (Typertext) {
    var BaseException = (function () {
        function BaseException(message, code, custom) {
            this.message = message;
            this.code = code;
            this.custom = custom;
        }
        BaseException.prototype.GetCode = function () {
            return this.code;
        };

        BaseException.prototype.GetMessage = function () {
            return this.message;
        };

        BaseException.prototype.GetCustom = function () {
            return this.custom;
        };
        return BaseException;
    })();
    Typertext.BaseException = BaseException;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    var GenericResponse = (function () {
        function GenericResponse(status, responseHeaderGetter, httpResponseCode, responseBody) {
            this.status = status;
            this.headers = responseHeaderGetter;
            this.httpStatus = httpResponseCode;
            this.content = responseBody;
        }
        GenericResponse.prototype.GetContent = function () {
            return this.content;
        };

        GenericResponse.prototype.GetContentType = function () {
            return this.GetHeader("Content-Type");
        };

        GenericResponse.prototype.GetHeader = function (name) {
            return this.headers(name);
        };

        GenericResponse.prototype.GetHttpStatus = function () {
            return this.httpStatus;
        };

        GenericResponse.prototype.GetStatus = function () {
            return this.status;
        };
        return GenericResponse;
    })();
    Typertext.GenericResponse = GenericResponse;
})(Typertext || (Typertext = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Typertext;
(function (Typertext) {
    (function (Http) {
        var HttpException = (function (_super) {
            __extends(HttpException, _super);
            function HttpException() {
                _super.apply(this, arguments);
            }
            return HttpException;
        })(Typertext.BaseException);
        Http.HttpException = HttpException;
    })(Typertext.Http || (Typertext.Http = {}));
    var Http = Typertext.Http;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Http) {
        (function (HttpMethod) {
            HttpMethod[HttpMethod["GET"] = 0] = "GET";
            HttpMethod[HttpMethod["POST"] = 1] = "POST";
        })(Http.HttpMethod || (Http.HttpMethod = {}));
        var HttpMethod = Http.HttpMethod;
    })(Typertext.Http || (Typertext.Http = {}));
    var Http = Typertext.Http;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Http) {
        (function (HttpProtocol) {
            HttpProtocol[HttpProtocol["http"] = 0] = "http";
            HttpProtocol[HttpProtocol["https"] = 1] = "https";
        })(Http.HttpProtocol || (Http.HttpProtocol = {}));
        var HttpProtocol = Http.HttpProtocol;
    })(Typertext.Http || (Typertext.Http = {}));
    var Http = Typertext.Http;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Http) {
        var HttpRequest = (function () {
            function HttpRequest() {
            }
            HttpRequest.prototype.Get = function (request, callback) {
                this.RawRequest(0 /* GET */, request, {}, callback);
            };

            HttpRequest.prototype.Post = function (request, postData, callback) {
                this.RawRequest(1 /* POST */, request, postData, callback);
            };

            HttpRequest.prototype.RawRequest = function (method, request, postData, callback) {
                if (typeof postData === "undefined") { postData = {}; }
                if (typeof callback === "undefined") { callback = function (c) {
                }; }
                var noop = function (i) {
                    return "";
                };

                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var getHeader = function (name) {
                            return xhr.getResponseHeader(name);
                        };

                        if (xhr.status == 200) {
                            callback(new Typertext.Http.HttpResponse(0 /* success */, getHeader, xhr.status, xhr.responseText));
                        } else if (xhr.status >= 400 && xhr.status < 500) {
                            throw new Typertext.Http.HttpException("The server returned an error response state", xhr.status, new Typertext.Http.HttpResponse(2 /* clientError */, getHeader, xhr.status, xhr.responseText));
                        } else if (xhr.status >= 500 && xhr.status < 600) {
                            throw new Typertext.Http.HttpException("The server returned an error response state", xhr.status, new Typertext.Http.HttpResponse(1 /* serverError */, getHeader, xhr.status, xhr.responseText));
                        } else {
                            throw new Typertext.Http.HttpException("An unknown error has occurred", -2, new Typertext.Http.HttpResponse(4 /* unknownError */, getHeader, xhr.status, xhr.responseText));
                        }
                    }
                };

                xhr.ontimeout = function () {
                    throw new Typertext.Http.HttpException("The server took too long to respond to our request", -1, new Typertext.Http.HttpResponse(5 /* timeout */, noop, -1, ""));
                };

                xhr.open(Typertext.Http.HttpMethod[method], request.ToString(), true);

                if (method == 0 /* GET */) {
                    xhr.send();
                    return;
                }

                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr.send(Typertext.Http.HttpUrl.UrlEncodeObject(postData));
            };
            return HttpRequest;
        })();
        Http.HttpRequest = HttpRequest;
    })(Typertext.Http || (Typertext.Http = {}));
    var Http = Typertext.Http;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Http) {
        var HttpResponse = (function (_super) {
            __extends(HttpResponse, _super);
            function HttpResponse(status, responseHeaderGetter, httpResponseCode, responseBody) {
                _super.call(this, status, responseHeaderGetter, httpResponseCode, responseBody);
            }
            return HttpResponse;
        })(Typertext.GenericResponse);
        Http.HttpResponse = HttpResponse;
    })(Typertext.Http || (Typertext.Http = {}));
    var Http = Typertext.Http;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Http) {
        (function (HttpResponseStatus) {
            HttpResponseStatus[HttpResponseStatus["success"] = 0] = "success";
            HttpResponseStatus[HttpResponseStatus["serverError"] = 1] = "serverError";
            HttpResponseStatus[HttpResponseStatus["clientError"] = 2] = "clientError";
            HttpResponseStatus[HttpResponseStatus["responseError"] = 3] = "responseError";
            HttpResponseStatus[HttpResponseStatus["unknownError"] = 4] = "unknownError";
            HttpResponseStatus[HttpResponseStatus["timeout"] = 5] = "timeout";
        })(Http.HttpResponseStatus || (Http.HttpResponseStatus = {}));
        var HttpResponseStatus = Http.HttpResponseStatus;
    })(Typertext.Http || (Typertext.Http = {}));
    var Http = Typertext.Http;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Http) {
        var HttpUrl = (function () {
            function HttpUrl(domain, protocol, path, queryString, port) {
                if (typeof protocol === "undefined") { protocol = 0 /* http */; }
                if (typeof path === "undefined") { path = "/"; }
                if (typeof queryString === "undefined") { queryString = {}; }
                if (typeof port === "undefined") { port = 0; }
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
            HttpUrl.DefaultPort = function (protocol) {
                switch (protocol) {
                    case 0 /* http */:
                        return 80;
                    case 1 /* https */:
                        return 443;
                    default:
                        return -1;
                }
            };

            HttpUrl.FromUrl = function (location) {
                var l = document.createElement("a");
                l.href = location;
                return new HttpUrl(l.hostname, Typertext.Http.HttpProtocol[l.protocol.slice(0, -1)], l.pathname, HttpUrl.DecodeQueryString(l.search), parseInt(l.port));
            };

            HttpUrl.DecodeQueryString = function (queryString) {
                if (queryString.indexOf("?") == 0) {
                    queryString = queryString.substring(1);
                }

                return HttpUrl.UrlDecodeString(queryString);
            };

            HttpUrl.EncodeQueryString = function (query) {
                var rs = "?" + HttpUrl.UrlEncodeObject(query);
                return ((rs.length == 1) ? "" : rs);
            };

            HttpUrl.UrlEncodeObject = function (data) {
                var rs = "";
                var temp;

                for (temp in data) {
                    rs += encodeURIComponent(temp) + "=" + encodeURIComponent(data[temp]) + "&";
                }

                return rs.slice(0, -1);
            };

            HttpUrl.UrlDecodeString = function (queryString) {
                var returnValue = {}, params = HttpUrl.splitString(queryString, "&");
                for (var i = 0; i < params.length; i++) {
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
            };

            HttpUrl.splitString = function (input, separator, limit) {
                if (typeof limit === "undefined") { limit = -1; }
                limit++;
                var chunks = input.split(separator);
                if (limit > 0 && chunks.length > limit) {
                    var ret = chunks.splice(0, limit);
                    ret.push(chunks.join(separator));
                    return ret;
                }
                return chunks;
            };

            HttpUrl.prototype.ToString = function () {
                return Typertext.Http.HttpProtocol[this.protocol] + "://" + this.domain + ((this.port == HttpUrl.DefaultPort(this.protocol)) ? "" : ":" + this.port) + this.path + HttpUrl.EncodeQueryString(this.queryString);
            };
            return HttpUrl;
        })();
        Http.HttpUrl = HttpUrl;
    })(Typertext.Http || (Typertext.Http = {}));
    var Http = Typertext.Http;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Json) {
        var JsonException = (function (_super) {
            __extends(JsonException, _super);
            function JsonException(message, code) {
                _super.call(this, message, code, null);
            }
            return JsonException;
        })(Typertext.BaseException);
        Json.JsonException = JsonException;
    })(Typertext.Json || (Typertext.Json = {}));
    var Json = Typertext.Json;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Json) {
        var HttpRequest = Typertext.Http.HttpRequest;

        var HttpResponseStatus = Typertext.Http.HttpResponseStatus;

        var HttpMethod = Typertext.Http.HttpMethod;

        var JsonRequest = (function () {
            function JsonRequest(jsonContentType) {
                if (typeof jsonContentType === "undefined") { jsonContentType = "application/json"; }
                this.request = new HttpRequest();
                this.jsonType = jsonContentType;
            }
            JsonRequest.prototype.Get = function (request, callback) {
                this.RawRequest(0 /* GET */, request, {}, callback);
            };

            JsonRequest.prototype.Post = function (request, postData, callback) {
                this.RawRequest(1 /* POST */, request, postData, callback);
            };

            JsonRequest.prototype.RawRequest = function (method, request, postData, callback) {
                var _this = this;
                if (typeof postData === "undefined") { postData = {}; }
                if (typeof callback === "undefined") { callback = function (c) {
                }; }
                this.request.RawRequest(method, request, postData, function (response) {
                    if (response.GetContentType() != _this.jsonType) {
                        callback(new Typertext.Json.JsonResponse(3 /* responseError */));
                    }

                    try  {
                        callback(Typertext.Json.JsonResponse.fromHttpResponse(response));
                    } catch (e) {
                        throw new Typertext.Json.JsonException("Json parse exception", -1);
                    }
                });
            };
            return JsonRequest;
        })();
        Json.JsonRequest = JsonRequest;
    })(Typertext.Json || (Typertext.Json = {}));
    var Json = Typertext.Json;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Json) {
        var JsonResponse = (function (_super) {
            __extends(JsonResponse, _super);
            function JsonResponse(status, responseHeaderGetter, httpResponseCode, responseBody) {
                _super.call(this, status, responseHeaderGetter, httpResponseCode, responseBody);
            }
            JsonResponse.fromHttpResponse = function (httpResponse) {
                return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeader, httpResponse.GetHttpStatus(), window["JSON"].parse(httpResponse.GetContent()));
            };
            return JsonResponse;
        })(Typertext.GenericResponse);
        Json.JsonResponse = JsonResponse;
    })(Typertext.Json || (Typertext.Json = {}));
    var Json = Typertext.Json;
})(Typertext || (Typertext = {}));
//# sourceMappingURL=typertext.js.map
