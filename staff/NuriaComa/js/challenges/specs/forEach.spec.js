"use strict"

describe("forEach", function() {

    it ('should fulfill output with values from input ', function() {
        
        var input =[1,2,3];
        var output =[];
        
        forEach(input, function(v) { output.push(v) })

        expect(input.length).toBe(output.length);
        expect(input).toEqual(output);

    })
    
    it("should throw error when no arguments", function(){

        expect (function() {
            forEach();
        }).toThrow(Error('input array is not an array'));
    });

    it('should throw error when no first arguments but second', function(){

        expect (function() {
            forEach(undefined, function(v) { output.push(v) });
        }).toThrow(Error('input array is not an array'));
    });
    it("should throw an error when no second arguments but first", function(){

        expect (function() {
            forEach([]);
        }).toThrow(Error('input handler is not a function'));
    });
});