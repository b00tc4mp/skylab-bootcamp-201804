"use strict";

function toRandomCase(str, func){
    if(typeof str !== "string"){
        throw Error ("input is not a string")
    }
    if (!func){
       
        var input="";
        var letters=str.toLowerCase();
        var lettersArray=letters.split("");
        for (var i=0; i<lettersArray.length; i++){

            var numRand=Math.random()>0.5;
            
            if (numRand){
                input += lettersArray[i].toUpperCase();
            } else {
               input += lettersArray[i];
             }   
        }
        return input
        

    }else {
        if (typeof func !== "function")
        throw Error ("input is not a string");
    }
}

