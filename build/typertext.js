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
        function GenericResponse(status, responseHeaders, httpResponseCode, responseBody) {
            this.status = status;
            this.headers = responseHeaders;
            this.httpStatus = httpResponseCode;
            this.content = responseBody;
        }
        GenericResponse.prototype.GetContent = function () {
            return this.content;
        };

        GenericResponse.prototype.GetContentType = function () {
            return this.GetHeaders()["Content-Type"];
        };

        GenericResponse.prototype.GetHeaders = function () {
            return this.headers;
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
            HttpRequest.parseHeaderString = function (headerStr) {
                var headers = {}, headerPairs = headerStr.split('\u000d\u000a');
                for (var i = 0; i < headerPairs.length; i++) {
                    var headerPair = headerPairs[i], index = headerPair.indexOf('\u003a\u0020');
                    if (index > 0) {
                        var key = headerPair.substring(0, index);
                        headers[key] = headerPair.substring(index + 2);
                    }
                }
                return headers;
            };

            HttpRequest.prototype.Get = function (request, callback) {
                this.RawRequest(0 /* GET */, request, {}, callback);
            };

            HttpRequest.prototype.Post = function (request, postData, callback) {
                this.RawRequest(0 /* GET */, request, postData, callback);
            };

            HttpRequest.prototype.RawRequest = function (method, request, postData, callback) {
                if (typeof postData === "undefined") { postData = {}; }
                if (typeof callback === "undefined") { callback = function (c) {
                }; }
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var headers = HttpRequest.parseHeaderString(xhr.getAllResponseHeaders());
                        if (xhr.status == 200) {
                            callback(new Typertext.Http.HttpResponse(0 /* success */, headers, xhr.status, xhr.responseText));
                        } else if (xhr.status >= 400 && xhr.status < 500) {
                            throw new Typertext.Http.HttpException("Error type is unimplemented", -1, 2 /* clientError */);
                        } else if (xhr.status >= 500 && xhr.status < 600) {
                            throw new Typertext.Http.HttpException("Error type is unimplemented", -1, 1 /* serverError */);
                        } else {
                            throw new Typertext.Http.HttpException("An unknown error has occurred", -2, 4 /* unknownError */);
                        }
                    }
                };

                xhr.ontimeout = function () {
                    callback(new Typertext.Http.HttpResponse(5 /* timeout */));
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
            function HttpResponse(status, responseHeaders, httpResponseCode, responseBody) {
                _super.call(this, status, responseHeaders, httpResponseCode, responseBody);
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
            HttpUrl.DefaultPort = function (protocol) {
                return ((protocol == 0 /* http */) ? 80 : 443);
            };

            HttpUrl.FromUrl = function (location) {
                var l = document.createElement("a");
                l.href = location;
                return new HttpUrl(l.hostname, Typertext.Http.HttpProtocol[l.protocol], l.pathname, HttpUrl.DecodeQueryString(l.search));
            };

            HttpUrl.DecodeQueryString = function (queryString) {
                if (queryString.length == 0 || queryString == "?") {
                    return {};
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
                    var param = HttpUrl.splitString(params[i], "=", 2);
                    if (param.length == 1) {
                        returnValue[param[0]] = "";
                        continue;
                    }

                    returnValue[param[0]] = param[1];
                }

                return returnValue;
            };

            HttpUrl.splitString = function (input, separator, limit) {
                if (typeof limit === "undefined") { limit = 0; }
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
                this.RawRequest(0 /* GET */, request, postData, callback);
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
            function JsonResponse(status, responseHeaders, httpResponseCode, responseBody) {
                _super.call(this, status, responseHeaders, httpResponseCode, responseBody);
            }
            JsonResponse.fromHttpResponse = function (httpResponse) {
                return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeaders(), httpResponse.GetHttpStatus(), window["JSON"].parse(httpResponse.GetContent()));
            };
            return JsonResponse;
        })(Typertext.GenericResponse);
        Json.JsonResponse = JsonResponse;
    })(Typertext.Json || (Typertext.Json = {}));
    var Json = Typertext.Json;
})(Typertext || (Typertext = {}));
//# sourceMappingURL=typertext.js.map
