describe("Typertext.BaseException", function () {
    it("exists", function () {
        expect(typeof Typertext.BaseException).toEqual("function");
    });

    it("works", function () {
        var inputString = "Test message",
            inputCode = 239,
            inputCustom = -1,
            testClass = new Typertext.Http.HttpException(inputString, inputCode, inputCustom);

        expect(testClass.GetCode()).toEqual(inputCode);
        expect(testClass.GetCustom()).toEqual(inputCustom);
        expect(testClass.GetMessage()).toEqual(inputString);
    });
});