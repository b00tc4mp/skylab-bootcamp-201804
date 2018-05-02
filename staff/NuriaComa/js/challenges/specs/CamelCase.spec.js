"use strict"

describe("toCamelCase", function() {

    it ('should toCamelCase("Hello My World") return helloMyWorld', function() {

        expect(toCamelCase("Hello My World")).toBe("helloMyWorld")

    })

    it("should throw an error", function(){

        expect (function() {
            toCamelCase(true);
        }).toThrow(Error("input is not a string"));
    });
    it('should throw error', function(){
        expect (function(){
            toCamelCase(1);
        }).toThrow(Error("input is not a string"))
    })

});