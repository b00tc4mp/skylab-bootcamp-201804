"use strict"


describe("Oscar List", function(){

    it( "Should OscarList return in order", function(){

    
    expect(oscarList = [{movie: 'The Shape of Water', year: 2017}, 
    {movie: 'Forrest Gump', year: 1995},
    {movie: 'Gladiator', year: 2000},
    {movie: 'A beautiful mind', year: 2001},
    {movie: 'The Lord of the Rings: The Return of the King',year: 2003},
    {movie: 'Rain Man', year: 1988}, {movie: 'Kramer vs. Kramer', year: 1979}]).toBe(oscarList=[{movie: 'Kramer vs. Kramer', year: 1979},
                                                                                            {movie: 'Rain Man', year: 1988}, 
                                                                                            {movie: 'Forrest Gump', year: 1995},
                                                                                            {movie: 'Gladiator', year: 2000},
                                                                                            {movie: 'A beautiful mind', year: 2001},
                                                                                            {movie: 'The Lord of the Rings: The Return of the King',year: 2003}, 
                                                                                            {movie: 'The Shape of Water', year: 2017}])

})

it ("should throw an error", function(){
    expect(function(){
        oscarList(true);
    }).toThrow(Error('input movie is not a string'))
})
})


