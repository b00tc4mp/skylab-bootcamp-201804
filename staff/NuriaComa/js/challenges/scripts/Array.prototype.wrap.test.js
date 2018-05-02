"use strict"

console.log(">>WRAP")

var input=[1,2,3]

test(

    function(){

         return input.wrap("<", ">")
    },
    'input.wrap should return ["<1>", "<2>", "<3>"]',

    function(result){
        return result.toString ===["<1>","<2>","<3>"].toString && input.toString()===[1,2,3]
    }
)


test(

    function(){

         return input.wrap("<", ">").wrap("[", "]");
    },
    'input.wrap should return ["[<1>]","[<2>]","[<3>]"]',

    function(result){
        return result.toString ===["[<1>]","[<2>]","[<3>]"].toString
    }
)



test(

    function(){

         return input.wrap("<", ">").wrap("[", "]").wrap("(", ")");
    },
    'input.wrap should return ["[(<1>])", "([<2>])", "([<3>])"]',

    function(result){
        return result.toString ===["[(<1>])","([<2>])","([<3>])"].toString
    }
)



test(
    withErrorCapturing(
        function() {
            input.wrap(" ");
        }
    ),
    'input.wrap(), should throw an error',

    function(result) {
        return result.message === "Symbol isn't correct";
    }
);


test(
    withErrorCapturing(
        function() {
            input.wrap();
        }
    ),
    'input.wrap(), should throw an error',

    function(result) {
        return result.message === "Symbol isn't correct";
    }
);