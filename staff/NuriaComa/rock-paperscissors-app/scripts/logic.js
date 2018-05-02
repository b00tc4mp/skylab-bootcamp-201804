'use strict'

function RockPaperScissors(name1, name2) {

    this._name1 = name1;
    this._name2 = name2;
    this._winner;
    this._status = RockPaperScissors.CONTINUE;
    this._state = []
    this.score1 = 0
    this.score2 = 0

}

RockPaperScissors.prototype.play = function (hand1, hand2) {

    if (typeof hand1 !== "string") {
        throw Error('invalid hands')
    }
    if (typeof hand2 !== "string") {
        throw Error('invalid hands')
    }

    this._hand1 = hand1.trim().toLowerCase();
    

    if (!this._hand1.length) throw Error('invalid hands');

    this._hand2 = hand2.trim().toLowerCase();

    if (!this._hand2.length) throw Error('invalid hands');

    if (this._hand1 !== "rock" && this._hand1 !== "paper" && this._hand1 !== "scissors") {
        throw Error('invalid hands')
    }

    if (this._hand2 !== "rock" && this._hand2 !== "paper" && this._hand2 !== "scissors") {
        throw Error('invalid hands')
    }

    

    if(this._status==RockPaperScissors.GAMEOVER){
        
        throw Error('GAME OVER!')
    }

    this._state.push({ player1: hand1, player2: hand2 });
    
    if (hand1 === "rock" && hand2 === "scissors") {
        this.score1++
    }
    else if (hand1 === "scissors" && hand2 === "paper") {
        this.score1++
    } 
    else if (hand1 === "paper" && hand2 === "rock") {
            this.score1++
    } else if (hand1===hand2){

     }else {
        this.score2++
    }

    if (this.score1 == 2 || this.score2 == 2) {

        this._status = RockPaperScissors.GAMEOVER

    } else {

        this._status = RockPaperScissors.CONTINUE
    }

    
}

RockPaperScissors.CONTINUE = 0;
RockPaperScissors.GAMEOVER = 1


RockPaperScissors.prototype.status = function () {
    return this._status

}

RockPaperScissors.prototype.winner = function () {

    if (this._status == RockPaperScissors.CONTINUE) {
        return this._winner

    }
    if (this._status == RockPaperScissors.GAMEOVER) {

        if (this.score1 == 2) {
            this._winner = this._name1
            return this._winner
        }
        if (this.score2 == 2) {
            this._winner = this._name2
            return this._winner
        }

    }


}
RockPaperScissors.prototype.state = function () {
    return this._state
}




