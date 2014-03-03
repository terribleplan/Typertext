describe("Typertext.Http.HttpException", function () {
    it("exists", function () {
        expect(typeof Typertext.Http.HttpException).toEqual("function");
    });

    it("works according to the parent class", function () {
        var inputString = "Test message",
            inputCode = 239,
            inputHttp = Typertext.Http.HttpResponseStatus.clientError,
            testClass = new Typertext.Http.HttpException(inputString, inputCode, inputHttp);

        expect(testClass.GetCode()).toEqual(inputCode);
        expect(testClass.GetCustom()).toEqual(inputHttp);
        expect(testClass.GetMessage()).toEqual(inputString);
    });
});