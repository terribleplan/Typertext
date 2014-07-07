describe("Typertext.Http.HttpUrl", function () {
    it("exists", function () {
        expect(typeof Typertext.Http.HttpUrl).toBe("function");
    });

    describe("DefaultPort", function () {
        it("exists", function () {
            expect(typeof Typertext.Http.HttpUrl.DefaultPort).toBe("function");
        });
        it("returns the correct default port for http", function () {
            var input = Typertext.Http.HttpProtocol.http,
                expectedOutput = 80,
                actualOutput = Typertext.Http.HttpUrl.DefaultPort(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("returns the correct default port for https", function () {
            var input = Typertext.Http.HttpProtocol.https,
                expectedOutput = 443,
                actualOutput = Typertext.Http.HttpUrl.DefaultPort(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("returns -1 (an invalid port) for any unrecognized protocol", function () {
            var inputs = [67, "", "nonsense", false, [], function () {
                }],
                expectedOutput = -1;

            for (var i = inputs.length - 1; i >= 0; i--) {
                expect(Typertext.Http.HttpUrl.DefaultPort(inputs[i])).toEqual(expectedOutput);
            }
        });
    });

    describe("FromUrl", function () {
        it("is a function", function () {
            expect(typeof Typertext.Http.HttpUrl.FromUrl).toBe("function");
        });

        it("handles a simple http url", function () {
            var input = "http://example.com/",
                expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.http),
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it("handles a simple https url", function () {
            var input = "https://example.com/",
                expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.https),
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it("handles an http url with a path", function () {
            var input = "http://example.com/hello",
                expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.http, "/hello"),
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it("handles an http url with a path to a file", function () {
            var input = "http://example.com/index.html",
                expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.http, "/index.html"),
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it("handles an http url with a query", function () {
            var input = "http://example.com/?with=query",
                expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.http, "/", {with: "query"}),
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it("handles an http url with a port", function () {
            var input = "http://example.com:81/",
                expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.http, "/", {}, 81),
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input);

            expect(actualOutput).toEqual(expectedOutput);
        });

        it("handles multiple complex urls", function () {
            var input = "https://example.com:453/path/to/some.php?with=query",
                expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.https, "/path/to/some.php", {with: "query"}, 453),
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input);
            expect(actualOutput).toEqual(expectedOutput);

            input = "http://example.com:22/path/thing/?without";
            expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.http, "/path/thing/", {without: ""}, 22);
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input);
            expect(actualOutput).toEqual(expectedOutput);

            input = "https://example.com:80/path/thing/.htaccess?version=125&something=else";
            expectedOutput = new Typertext.Http.HttpUrl("example.com", Typertext.Http.HttpProtocol.https, "/path/thing/.htaccess", {version: "125", something: "else"}, 80);
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input);
            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe("DecodeQueryString", function () {
        it("follows the same spec as DecodeQueryString, but will remove an optional leading '?'", function () {
            var input = "?fizz=buzz",
                expectedOutput = {
                    fizz: "buzz"
                },
                actualOutput = Typertext.Http.HttpUrl.DecodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);
            input = "fizz=buzz";
            actualOutput = Typertext.Http.HttpUrl.DecodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);

            input = "?foo=bar&fizz=buzz&your=mom";
            expectedOutput = {
                fizz: "buzz",
                foo: "bar",
                your: "mom"
            };
            actualOutput = Typertext.Http.HttpUrl.DecodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);
            input = "foo=bar&fizz=buzz&your=mom";
            actualOutput = Typertext.Http.HttpUrl.DecodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);

            input = "?foo=bar&fizz=buzz&enc%26me(=o%40u%23T%24";
            expectedOutput = {
                "enc&me(": "o@u#T$",
                fizz: "buzz",
                foo: "bar"
            };
            actualOutput = Typertext.Http.HttpUrl.DecodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);
            input = "foo=bar&fizz=buzz&enc%26me(=o%40u%23T%24";
            actualOutput = Typertext.Http.HttpUrl.DecodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe("EncodeQueryString", function () {
        it("follows the same spec as UrlEncodeObject, but with a prepended '?'", function () {
            var input = {},
                expectedOutput = "",
                actualOutput = Typertext.Http.HttpUrl.EncodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);

            input = {
                foo: "bar"
            };
            expectedOutput = "?foo=bar";
            actualOutput = Typertext.Http.HttpUrl.EncodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);

            input = {
                "enc&me(": "o@u#T$"
            };
            expectedOutput = "?enc%26me(=o%40u%23T%24";
            actualOutput = Typertext.Http.HttpUrl.EncodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);

            input = {
                "foo": "bar",
                "fizz": "buzz"
            };
            expectedOutput = "?foo=bar&fizz=buzz";
            actualOutput = Typertext.Http.HttpUrl.EncodeQueryString(input);
            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe("UrlEncodeObject", function () {
        //TODO
        it("encodes an empty object as an empty string", function () {
            var input = {},
                expectedOutput = "",
                actualOutput = Typertext.Http.HttpUrl.UrlEncodeObject(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("encodes an object with one k/v string pair", function () {
            var input = {
                    foo: "bar"
                },
                expectedOutput = "foo=bar",
                actualOutput = Typertext.Http.HttpUrl.UrlEncodeObject(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("encodes an object with one k/v string pair with special characters in both the key and value", function () {
            var input = {
                    "enc&me(": "o@u#T$"
                },
                expectedOutput = "enc%26me(=o%40u%23T%24",
                actualOutput = Typertext.Http.HttpUrl.UrlEncodeObject(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("encodes multiple key/value pairs", function () {
            var input = {
                    "foo": "bar",
                    "fizz": "buzz"
                },
                expectedOutput = "foo=bar&fizz=buzz",
                actualOutput = Typertext.Http.HttpUrl.UrlEncodeObject(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("encodes a key with an array value", function () {
            var input = {
                    "foo": ["bar", "fizz", "buzz"]
                },
                expectedOutput = "foo=bar&foo=fizz&foo=buzz",
                actualOutput = Typertext.Http.HttpUrl.UrlEncodeObject(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe("UrlDecodeObject", function () {
        it("decodes an empty string properly", function () {
            var input = "",
                expectedOutput = {},
                actualOutput = Typertext.Http.HttpUrl.UrlDecodeString(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("decodes a single key/value pair", function () {
            var input = "fizz=buzz",
                expectedOutput = {
                    fizz: "buzz"
                },
                actualOutput = Typertext.Http.HttpUrl.UrlDecodeString(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("decodes multiple key/value pairs", function () {
            var input = "foo=bar&fizz=buzz&your=mom",
                expectedOutput = {
                    fizz: "buzz",
                    foo: "bar",
                    your: "mom"
                },
                actualOutput = Typertext.Http.HttpUrl.UrlDecodeString(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
        it("decodes key/value pairs with special characters", function () {
            var input = "foo=bar&fizz=buzz&enc%26me(=o%40u%23T%24",
                expectedOutput = {
                    "enc&me(": "o@u#T$",
                    fizz: "buzz",
                    foo: "bar"
                },
                actualOutput = Typertext.Http.HttpUrl.UrlDecodeString(input);

            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe("ToString", function () {
        it("handles simple urls", function () {
            var input = "http://example.com/",
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);

            input = "https://example.com/";
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);

            input = "http://example.com/hello";
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);

            input = "http://example.com/index.html";
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);

            input = "http://example.com/?with=query";
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);

            input = "http://example.com:81/";
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);
        });
        it("handles multiple complex urls", function () {
            var input = "https://example.com:453/path/to/some.php?with=query",
                actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);

            input = "http://example.com:22/path/thing/?without=";
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);

            input = "https://example.com:80/path/thing/.htaccess?version=125&something=else";
            actualOutput = Typertext.Http.HttpUrl.FromUrl(input).ToString();
            expect(actualOutput).toEqual(input);
        });
    })
});