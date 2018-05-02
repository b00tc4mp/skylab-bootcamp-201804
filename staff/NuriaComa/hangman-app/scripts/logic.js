'use strict'

    function createWord(wordToGuess){
            
        for (var i=0; i<wordToGuess.length; i++){
            
            this.hangman.push("_");
        }
    }

    function Hangman(wordToGuess,attemps){
        
        if(typeof wordToGuess !== "string"){
            throw Error('invalid input word');
        }
       
        
        this.wordToGuess = wordToGuess;

        this.acum=0;
        this.hangman= new Array(this.wordToGuess.length).fill('_');
        this.letter=[];
        this._attempts=10;

        Hangman.CONTINUE=0;
        Hangman.WIN=1;
        Hangman.LOSE=2;
    }

    Hangman.prototype.try=function(letter){

        if(typeof letter !=="string"){
            throw Error('invalid input letter or word');
        };

        this.letter=letter.trim();
    
        for (var i=0; i<this.wordToGuess.length; i++){

            if(this.wordToGuess.includes(letter)){
                
                this.letter
                return true;
                
                
            }else{
                this._attempts --;
                return false;
                
            }
        }
      
    }
    Hangman.prototype.guessed=function(){

        for (var i=0; i < this.wordToGuess.length; i++){
        
            if(this.letter === this.wordToGuess.charAt(i)){
                this.hangman[i] = this.letter;    
            }   
        }

        return this.hangman
    }
           
    Hangman.prototype.attempts=function(){

       return this._attempts
        

            
    }
   
    Hangman.prototype.status=function(){
        return this._status
 

    }
    
        

