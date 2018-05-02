"use strict"


 /**
  * Receives a list of objects which contain the name of a movie and the year it won the oscar..
  * 
  * @example
  * 
  * var oscarList= [{movie: 'The Shape of Water', year: 2017}, 
  *                 {movie: 'Forrest Gump', year: 1995},
  *                 {movie: 'Gladiator', year: 2000},
  *                 {movie: 'A beautiful mind', year: 2001},
  *                 {movie: 'The Lord of the Rings: The Return of the King',year: 2003},
  *                 {movie: 'Rain Man', year: 1988}, 
  *                 {movie: 'Kramer vs. Kramer', year: 1979}]); 
  *                
  *                  // ->  [{movie: 'Kramer vs. Kramer', year: 1979},
  *                         {movie: 'Rain Man', year: 1988}, 
  *                         {movie: 'Forrest Gump', year: 1995},
  *                         {movie: 'Gladiator', year: 2000},
  *                         {movie: 'A beautiful mind', year: 2001},
  *                         {movie: 'The Lord of the Rings: The Return of the King',year: 2003}, 
  *                         {movie: 'The Shape of Water', year: 2017}]

  * 
  * @param {string} text - The name of the movie.
  * @param {number} number - The year of the movie.
  * 
  * @throws {Error} - If input movie text is not a string.
  * @throws {Error} - If input number is not a number.
  * 
  * @returns {} - The object oscarList in order.
  */

  function oscarWinners(arr){
    
    if (!(arr instanceof Array)){
        throw Error ('input movie is not an Array');

    }
    
    var oscarList= [{movie: 'The Shape of Water', year: 2017}, 
    {movie: 'Forrest Gump', year: 1995},
    {movie: 'Gladiator', year: 2000},
    {movie: 'A beautiful mind', year: 2001},
    {movie: 'The Lord of the Rings: The Return of the King',year: 2003},
    {movie: 'Rain Man', year: 1988}, {movie: 'Kramer vs. Kramer', year: 1979}]

        oscarList.sort(function (a, b){
            
        return  a.year - b.year;
            
        })
  }
