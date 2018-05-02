"use strict"

describe("countWords", function() {

    it ('should countWords("hello world") return 2', function() {

        expect(countWords("hello world")).toBe(2)

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