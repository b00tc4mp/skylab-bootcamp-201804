'use strict';

var logic = (function () {
    function call(path, callback) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("load", function () {
            var results = JSON.parse(this.responseText);
    
            callback(results);
        });
        
        xhr.open("GET", "https://quiet-inlet-67115.herokuapp.com/api/" + path);
        xhr.send();
    }

    return {
        searchBeers: function (query, callback) {
            call('search/all?q=' + query, callback);
        },

        getBeerInfo: function (id, callback) {
            call('beer/' + id, callback);
        }
    };
})();