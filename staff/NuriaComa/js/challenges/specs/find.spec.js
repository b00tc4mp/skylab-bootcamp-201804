"use strict"

describe("find", function() {

    it ('should find (["john", "mary", "jack"], function(v){return v.indexOf("a")> -1}) return "mary', function() {

        expect((["john", "mary", "jack"], function(v){return v.indexOf("a")> -1})).toBe("mary")

    })

    it("should throw an error", function(){

        expect (function() {
            find(true);
        }).toThrow(Error("input array is not valid"));
    });
    it('should throw error', function(){
        expect (function(){
            find(1);
        }).toThrow(Error("input array is not valid"))
    })
    it('should throw error', function(){
        expect (function(){
            find([]);
        }).toThrow(Error("input array is not valid"))
    })
});