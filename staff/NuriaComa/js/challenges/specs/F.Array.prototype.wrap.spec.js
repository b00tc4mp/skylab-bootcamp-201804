"use strict"

describe("Array.prototype.wrap", function() {

    it ('should input.wrap return ["<1>","<2>","<3>"]', function() {

        expect(result.toString).toBe(["<1>","<2>","<3>"].toString)

    })

    it ('should input.wrap should return ["[<1>]","[<2>]","[<3>]"]', function() {

        expect(result.toString).toBe(["[<1>]","[<2>]","[<3>]"].toString)

    })
    it("should throw an error", function(){

        expect (function() {
            countWords(true);
        }).toThrow(Error('input text is not a string'));
    });
    it('should throw error', function(){
        expect (function(){
            countChars(1);
        }).toThrow(Error('input text is not a string'))
    })
    it('should throw error', function(){
        expect (function(){
            countWords([]);
        }).toThrow(Error('input text is not a string'))
    })
});