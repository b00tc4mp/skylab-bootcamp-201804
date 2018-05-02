"use strict"

/**
 * Wraps the items of an input with left and right text array and return them in new array.
 * 
 * @example 
 * 
 * var a = [1, 2, 3].
 * 
 * a.wrap('[', ']'); // -> ['[1]', '[2]', '[3]'].
 * 
 * a.wrap('[', ']').wrap('{', '}'); // -> ['{[1]}', '{[2]}', '{[3]}'].
 * 
 * a.wrap('[', ']').wrap('{', '}').wrap('<', '>'); // -> ['<{[1]}>', '<{[2]}>', '<{[3]}>'].
 * 
 * @param {string} left - the left text to set in the left side of a wraping.
 * 
 * @param {string} right - the right text to set in the right side of a wrapping.
 * 
 * 
 * @returns {Array} -  the resulting array with the contents of the input resulting wrapped
 * 
 * @throws {Error} - if it's not a text.
 * 
 */

if( typeof Array.prototype.wrap !== "function"){

    Array.prototype.wrap= function (s1,s2){

        if( s1==="undefined" || s2==="undefined"){
            throw Error ("Symbol isn't correct" )
        }
        if(s1!== "string" && s2!=="string"){
            throw Error ("Symbol isn't correct" )
        }

        var res= [];

        for (var i=0;i<this.length; i++){
            res.push(s1 + this[i] + s2)
           
        }
        return res
    }
}
 