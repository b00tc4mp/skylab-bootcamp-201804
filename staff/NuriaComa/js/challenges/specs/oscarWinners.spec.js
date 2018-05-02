"use strict"


describe("oscarWinners", function(){

    it( "Should oscarWinners return in order", function(){
       
        var oscarList=[{movie: 'The Shape of Water', year: 2017}, 
            {movie: 'Forrest Gump', year: 1995},
            {movie: 'Gladiator', year: 2000},
            {movie: 'A beautiful mind', year: 2001},
            {movie: 'The Lord of the Rings: The Return of the King',year: 2003},
            {movie: 'Rain Man', year: 1988}, 
            {movie: 'Kramer vs. Kramer', year: 1979}];
        
           var res= oscarWinners(oscarList);

    
        expect(res[0].year).toBe(1979)
        expect(res[3].year).toBe(2000)
        expect(res[6].year).toBe(2017)

    })

    it ("should throw an error", function(){
        expect(function(){
            oscarWinners();
        }).toThrow(Error('input movie is not an Array'))
    })

})


