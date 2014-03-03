describe("Typertext.Http.HttpResponse", function () {
    it("exists", function () {
        expect(typeof Typertext.Http.HttpResponse).toEqual("function");
    });

    it("works according to the parent class", function () {
        function hf(input) {
            return "TestString" + input;
        }
        var inputString = "Test message",
            inputCode = 239,
            inputHttp = Typertext.Http.HttpResponseStatus.clientError,
            testClass = new Typertext.Http.HttpResponse(inputHttp, hf, inputCode, inputString);

        expect(testClass.GetContent()).toEqual(inputString);
        expect(testClass.GetHeader("foo")).toEqual("TestStringfoo");
        expect(testClass.GetHttpStatus()).toEqual(inputCode);
        expect(testClass.GetStatus()).toEqual(inputHttp);
    });
});