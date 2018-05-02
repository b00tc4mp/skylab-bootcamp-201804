"use strict"


describe("toRandomCase", function() {

    it ('toRandomCase(input) should return input in random case', function() {
       
        var input="Hello My World";
        var output=toRandomCase(input);

        expect(input.toLowerCase()).toBe(output.toLowerCase())
        expect(input).not.toBe(output);

    })

    it("should throw an error", function(){

        expect (function() {
            toRandomCase(true)
        }).toThrow(Error("input is not a string"));
    });
    it('should throw error', function(){
        expect (function(){
            toRandomCase(1);
        }).toThrow(Error("input is not a string"))
    })
    
});