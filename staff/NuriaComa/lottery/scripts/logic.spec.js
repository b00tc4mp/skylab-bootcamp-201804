'use strict'

describe("lottery", function() {

    it ('should ', function() {

        expect().toBe()

    })

    it("should throw an error", function(){

        expect (function() {
            lottery(true);
        }).toThrow(Error("input is not a number"));
    });
    it('should throw error', function(){
        expect (function(){
            lottery("a");
        }).toThrow(Error("input is not a number"))
    })

});