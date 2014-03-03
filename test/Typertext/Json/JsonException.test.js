describe("Typertext.Json.JsonException", function () {
    it("exists", function () {
        expect(typeof Typertext.Json.JsonException).toEqual("function");
    });

    it("works according to the parent class", function () {
        var inputString = "Test message",
            inputCode = 239,
            testClass = new Typertext.Json.JsonException(inputString, inputCode, null);

        expect(testClass.GetCode()).toEqual(inputCode);
        expect(testClass.GetCustom()).toEqual(null);
        expect(testClass.GetMessage()).toEqual(inputString);
    });
});