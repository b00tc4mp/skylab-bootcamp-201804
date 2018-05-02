'use strict';

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();

    var input = this.elements[0];

    var query = input.value;

    logic.searchBeers(query, function (beers) {
        listBeers(beers);
    });

    input.value = '';
});

var list;

function listBeers(beers) {
    if (!list) {
        list = document.createElement('ul');

        document.body.appendChild(list);
    }

    //list.innerHTML = '';
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    beers.forEach(function (beer) {
        var item = document.createElement('li');
        var link= document.createElement('a');

        link.addEventListener("click", function (){

            logic.getBeerInfo(beer.id, function(){

                if (!info) {
                    info = document.createElement('section');
            
                    document.body.appendChild(info);
                }
            
                info.innerHTML = '';
            

                var title= document.createElement("h1");
                document.body.appendChild(title);
                title.appendChild(document.createTextNode(beer.name));

                var info=document.createElement("p");
                document.body.appendChild(info);
                info.appendChild(document.createTextNode(beer.style.description));
       
                if(beer.labels.medium){
                    var iconImg=document.createElement("img")
                    iconImg.src=beer.labels.medium;
                    document.body.appendChild(iconImg);
                }
                
            })
            

        })
       
        link.appendChild(document.createTextNode(beer.name));
        
        item.appendChild(link);
        
        list.appendChild(item);
    });
}
