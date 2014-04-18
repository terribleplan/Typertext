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
    (function (Transport) {
    })(Typertext.Transport || (Typertext.Transport = {}));
    var Transport = Typertext.Transport;
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
        var TransportChooser = Typertext.Transport.TransportChooser;

        var HttpRequest = (function () {
            function HttpRequest() {
            }
            HttpRequest.prototype.Get = function (request, callback) {
                this.RawRequest(0 /* GET */, request, {}, callback);
            };

            HttpRequest.prototype.Post = function (request, postData, callback) {
                this.RawRequest(1 /* POST */, request, postData, callback);
            };

            HttpRequest.prototype.RawRequest = function (method, request, postData, callback, transport) {
                if (typeof postData === "undefined") { postData = {}; }
                if (!callback)
                    callback = function (c) {
                        return null;
                    };

                if (!transport)
                    transport = TransportChooser.Transport(method, request, postData, callback);

                var transportInstance = new transport(method, request, postData, callback);
                transportInstance.Send();
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
                if (!l.hostname || !l.protocol || !l.pathname || !l.search || !l.port) {
                    l.href = l.href;
                }
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

            HttpUrl.prototype.GetPort = function () {
                return this.port;
            };

            HttpUrl.prototype.GetDomain = function () {
                return this.domain;
            };

            HttpUrl.prototype.GetProtocol = function () {
                return this.protocol;
            };

            HttpUrl.prototype.SameOriginCheck = function (url) {
                return (this.domain === url.GetDomain() && this.port === url.GetPort() && this.protocol === url.GetProtocol());
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

            JsonRequest.prototype.RawRequest = function (method, request, postData, callback, transport) {
                var _this = this;
                if (typeof postData === "undefined") { postData = {}; }
                if (typeof callback != "function") {
                    this.request.RawRequest(method, request, postData, function () {
                    });
                    return;
                }

                this.request.RawRequest(method, request, postData, function (response) {
                    if (response.GetContentType() != _this.jsonType) {
                        callback(Typertext.Json.JsonResponse.fromInvalidHttpResponse(response));
                        return;
                    }

                    callback(Typertext.Json.JsonResponse.fromHttpResponse(response));
                }, transport);
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
        var HttpResponseStatus = Typertext.Http.HttpResponseStatus;

        var JsonResponse = (function (_super) {
            __extends(JsonResponse, _super);
            function JsonResponse(status, responseHeaderGetter, httpResponseCode, responseBody, parseSuccess) {
                _super.call(this, status, responseHeaderGetter, httpResponseCode, responseBody);
                parseSuccess = !!parseSuccess || false;
                this.parseSuccess = parseSuccess;
            }
            JsonResponse.fromHttpResponse = function (httpResponse) {
                try  {
                    return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeader, httpResponse.GetHttpStatus(), window["JSON"].parse(httpResponse.GetContent()), true);
                } catch (e) {
                    return new JsonResponse(httpResponse.GetStatus(), httpResponse.GetHeader, httpResponse.GetHttpStatus(), null);
                }
            };

            JsonResponse.fromInvalidHttpResponse = function (httpResponse) {
                return new JsonResponse(3 /* responseError */, httpResponse.GetHeader, httpResponse.GetHttpStatus());
            };

            JsonResponse.prototype.GetParseStatus = function () {
                return this.parseSuccess;
            };
            return JsonResponse;
        })(Typertext.GenericResponse);
        Json.JsonResponse = JsonResponse;
    })(Typertext.Json || (Typertext.Json = {}));
    var Json = Typertext.Json;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Transport) {
        var HttpUrl = Typertext.Http.HttpUrl;

        var TransportChooser = (function () {
            function TransportChooser() {
            }
            TransportChooser.Transport = function (method, request, postData, callback) {
                var ieTestDiv = document.createElement("div");
                ieTestDiv.innerHTML = "<!--[if lte IE 7]><i></i><![endif]-->";

                if (ieTestDiv.getElementsByTagName("i").length === 1) {
                    throw {};
                }

                ieTestDiv.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->";
                var ieLte9 = (ieTestDiv.getElementsByTagName("i").length === 1);
                var origin = HttpUrl.FromUrl(window.location.href);

                if (origin.SameOriginCheck(origin) || !ieLte9) {
                    return Typertext.Transport.XHR;
                }

                if (origin.GetProtocol() === request.GetProtocol()) {
                    return Typertext.Transport.XDR;
                }

                throw {};
            };
            return TransportChooser;
        })();
        Transport.TransportChooser = TransportChooser;
    })(Typertext.Transport || (Typertext.Transport = {}));
    var Transport = Typertext.Transport;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Transport) {
        var HttpMethod = Typertext.Http.HttpMethod;
        var HttpUrl = Typertext.Http.HttpUrl;

        var HttpResponseStatus = Typertext.Http.HttpResponseStatus;
        var HttpResponse = Typertext.Http.HttpResponse;

        var XDR = (function () {
            function XDR(method, request, postData, callback) {
                if (typeof postData === "undefined") { postData = {}; }
                if (typeof callback === "undefined") { callback = function (c) {
                    return null;
                }; }
                this.postData = postData;
                this.method = method;
                this.request = request;
                this.callback = callback;

                this.xdr = new XDomainRequest();
            }
            XDR.prototype.Send = function () {
                var _this = this;
                var getHeader = function (name) {
                    if (name.toLowerCase() === "content-type") {
                        return _this.xdr.contentType;
                    }
                    return undefined;
                };

                this.xdr.ontimeout = function () {
                    _this.callback(new HttpResponse(5 /* timeout */, function (i) {
                        return "";
                    }, -1, ""));
                };

                this.xdr.onerror = function () {
                    _this.callback(new HttpResponse(4 /* unknownError */, getHeader, -1, _this.xdr.responseText));
                };

                this.xdr.onload = function () {
                    _this.callback(new HttpResponse(0 /* success */, getHeader, 200, _this.xdr.responseText));
                };

                this.xdr.onprogress = function () {
                    return null;
                };

                this.xdr.open(HttpMethod[this.method], this.request.ToString());

                if (this.method == 0 /* GET */) {
                    this.xdr.send();
                    return;
                }

                this.xdr.send(HttpUrl.UrlEncodeObject(this.postData));
            };

            XDR.prototype.Destroy = function () {
                this.xdr.ontimeout = this.xdr.onerror = this.xdr.onload = this.xdr.onprogress = null;
                this.xdr = null;
            };
            return XDR;
        })();
        Transport.XDR = XDR;
    })(Typertext.Transport || (Typertext.Transport = {}));
    var Transport = Typertext.Transport;
})(Typertext || (Typertext = {}));
var Typertext;
(function (Typertext) {
    (function (Transport) {
        var HttpMethod = Typertext.Http.HttpMethod;
        var HttpUrl = Typertext.Http.HttpUrl;

        var HttpResponseStatus = Typertext.Http.HttpResponseStatus;
        var HttpResponse = Typertext.Http.HttpResponse;

        var XHR = (function () {
            function XHR(method, request, postData, callback) {
                if (typeof postData === "undefined") { postData = {}; }
                if (typeof callback === "undefined") { callback = function (c) {
                    return null;
                }; }
                var _this = this;
                this.postData = postData;
                this.method = method;
                this.request = request;
                this.callback = callback;

                this.xhr = new XMLHttpRequest();

                this.xhr.onreadystatechange = function () {
                    if (_this.xhr.readyState == 4) {
                        var getHeader = function (name) {
                            return _this.xhr.getResponseHeader(name);
                        };

                        if (_this.xhr.status == 200) {
                            _this.callback(new HttpResponse(0 /* success */, getHeader, _this.xhr.status, _this.xhr.responseText));
                        } else if (_this.xhr.status >= 400 && _this.xhr.status < 500) {
                            _this.callback(new HttpResponse(2 /* clientError */, getHeader, _this.xhr.status, _this.xhr.responseText));
                        } else if (_this.xhr.status >= 500 && _this.xhr.status < 600) {
                            _this.callback(new HttpResponse(1 /* serverError */, getHeader, _this.xhr.status, _this.xhr.responseText));
                        } else {
                            _this.callback(new HttpResponse(4 /* unknownError */, getHeader, _this.xhr.status, _this.xhr.responseText));
                        }
                    }
                };

                this.xhr.ontimeout = function () {
                    _this.callback(new HttpResponse(5 /* timeout */, function (i) {
                        return "";
                    }, -1, ""));
                };
            }
            XHR.prototype.Send = function () {
                this.xhr.open(HttpMethod[this.method], this.request.ToString(), true);

                if (this.method == 0 /* GET */) {
                    this.xhr.send();
                    return;
                }

                this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                this.xhr.send(HttpUrl.UrlEncodeObject(this.postData));
            };

            XHR.prototype.Destroy = function () {
                this.xhr.onreadystatechange = this.xhr.ontimeout = null;
                this.xhr = null;
            };
            return XHR;
        })();
        Transport.XHR = XHR;
    })(Typertext.Transport || (Typertext.Transport = {}));
    var Transport = Typertext.Transport;
})(Typertext || (Typertext = {}));
//# sourceMappingURL=typertext.js.map
