describe("Typertext.Json.JsonResponse", function () {
    it("exists", function () {
        expect(typeof Typertext.Json.JsonResponse).toBe("function");
    });

    describe("fromHttpResponse", function () {
        it("exists", function () {
            expect(typeof Typertext.Json.JsonResponse.fromHttpResponse).toBe("function");
        });

        it("handles an empty json object response", function () {
            function hf() {
                return "";
            }

            var inputBody = "{}",
                input = new Typertext.Http.HttpResponse(Typertext.Http.HttpResponseStatus.success, hf, 200, inputBody),
                expectedBody = {},
                expectedOutput = new Typertext.Json.JsonResponse(Typertext.Http.HttpResponseStatus.success, hf, 200, expectedBody),
                actualOutput = Typertext.Json.JsonResponse.fromHttpResponse(input);
            expect(window["JSON"].parse(inputBody)).toEqual(expectedBody);
            expect(window["JSON"].stringify(actualOutput)).toEqual(window["JSON"].stringify(expectedOutput));
        });

        it("handles an empty string", function () {
            function hf() {
                return "";
            }

            var inputBody = "",
                input = new Typertext.Http.HttpResponse(Typertext.Http.HttpResponseStatus.success, hf, 200, inputBody);
            expect(function () {
                Typertext.Json.JsonResponse.fromHttpResponse(input);
            }).toThrow();
        });

        it("handles an example server response", function () {
            function hf() {
                return "";
            }

            var inputBody = "{\"access_token\":\"0d95289cb2f54831dc435ce9274b1d1bdf8f5949\",\"expires_in\":86400," +
                    "\"token_type\":\"Bearer\",\"scope\":null," +
                    "\"refresh_token\":\"8a4431470af2edc3fdf747eca5f71451a3ad2d98\"}",
                input = new Typertext.Http.HttpResponse(Typertext.Http.HttpResponseStatus.success, hf, 200, inputBody),
                expectedBody = {
                    "access_token": "0d95289cb2f54831dc435ce9274b1d1bdf8f5949",
                    "expires_in": 86400,
                    "token_type": "Bearer",
                    "scope": null,
                    "refresh_token": "8a4431470af2edc3fdf747eca5f71451a3ad2d98"
                },
                expectedOutput = new Typertext.Json.JsonResponse(Typertext.Http.HttpResponseStatus.success, hf, 200, expectedBody),
                actualOutput = Typertext.Json.JsonResponse.fromHttpResponse(input);
            expect(window["JSON"].parse(inputBody)).toEqual(expectedBody);
            expect(window["JSON"].stringify(actualOutput)).toEqual(window["JSON"].stringify(expectedOutput));
        });
    });
});