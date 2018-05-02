'use strict'

describe('logic (rock-paper-scissors)', function () {
    var game

    beforeEach(function() {
        game = new RockPaperScissors('romeo', 'juliette')
    })

    it('should game states be different', function() {
        expect(RockPaperScissors.CONTINUE).not.toBe(RockPaperScissors.GAMEOVER)
    })

    it('should err on invalid hands', function () {
        expect(function() {
            game.play()
        }).toThrowError('invalid hands')

        expect(function() {
            game.play(true, false)
        }).toThrowError('invalid hands')

        expect(function() {
            game.play(1, 2)
        }).toThrowError('invalid hands')

        expect(function() {
            game.play('piedra', 'papel')
        }).toThrowError('invalid hands')

        expect(function() {
            game.play('rock')
        }).toThrowError('invalid hands')

        expect(function() {
            game.play(undefined, 'rock')
        }).toThrowError('invalid hands')

        expect(function() {
            game.play({}, [])
        }).toThrowError('invalid hands')

        expect(function() {
            game.play('', '')
        }).toThrowError('invalid hands')
    })

    it('should not err on valid hands variants', function () {
        expect(function() {
            game.play('ROCK', 'PAPER')
        }).not.toThrowError('invalid hands')

        expect(function() {
            game.play('    ROCK', 'PAPER       ')
        }).not.toThrowError('invalid hands')

        expect(function() {
            game.play('sciSsOrs', 'RocK')
        }).not.toThrowError('invalid hands')

        expect(function() {
            game.play('sciSsOrs     ', '     RocK')
        }).not.toThrowError('invalid hands')
    })

    it('should player1 win in 2 rounds', function () {
        game.play('paper', 'rock')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('scissors', 'paper')
        expect(game.status()).toBe(RockPaperScissors.GAMEOVER)
        expect(game.winner()).toBe('romeo')

        var state = game.state()
        expect(state.length).toBe(2)
        expect(state[0]).toEqual({ player1: 'paper', player2: 'rock'})
        expect(state[1]).toEqual({ player1: 'scissors', player2: 'paper'})
    })

    it('should player1 win in 3 rounds', function () {
        game.play('rock', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('scissors', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('rock', 'scissors')
        expect(game.status()).toBe(RockPaperScissors.GAMEOVER)
        expect(game.winner()).toBe('romeo')

        var state = game.state()
        expect(state.length).toBe(3)
        expect(state[0]).toEqual({ player1: 'rock', player2: 'paper'})
        expect(state[1]).toEqual({ player1: 'scissors', player2: 'paper'})
        expect(state[2]).toEqual({ player1: 'rock', player2: 'scissors'})
    })

    it('should player2 win in 6 rounds, after 3 ties', function () {
        game.play('rock', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('scissors', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('rock', 'rock')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('paper', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('scissors', 'scissors')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('paper', 'scissors')
        expect(game.status()).toBe(RockPaperScissors.GAMEOVER)
        expect(game.winner()).toBe('juliette')

        var state = game.state()
        expect(state.length).toBe(6)
        expect(state[0]).toEqual({ player1: 'rock', player2: 'paper'})
        expect(state[1]).toEqual({ player1: 'scissors', player2: 'paper'})
        expect(state[2]).toEqual({ player1: 'rock', player2: 'rock'})
        expect(state[3]).toEqual({ player1: 'paper', player2: 'paper'})
        expect(state[4]).toEqual({ player1: 'scissors', player2: 'scissors'})
        expect(state[5]).toEqual({ player1: 'paper', player2: 'scissors'})
    })

    it('should player2 win in 3 rounds, after 2 ties in last two rounds', function () {
        game.play('rock', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('scissors', 'scissors')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('rock', 'rock')
        expect(game.status()).toBe(RockPaperScissors.GAMEOVER)
        expect(game.winner()).toBe('juliette')

        var state = game.state()
        expect(state.length).toBe(3)
        expect(state[0]).toEqual({ player1: 'rock', player2: 'paper'})
        expect(state[1]).toEqual({ player1: 'scissors', player2: 'scissors'})
        expect(state[2]).toEqual({ player1: 'rock', player2: 'rock'})
    })

    it('should player1 win in 4 rounds, after 1 tie in second round', function () {
        game.play('rock', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('scissors', 'scissors')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('paper', 'rock')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('paper', 'rock')
        expect(game.status()).toBe(RockPaperScissors.GAMEOVER)
        expect(game.winner()).toBe('romeo')

        var state = game.state()
        expect(state.length).toBe(4)
        expect(state[0]).toEqual({ player1: 'rock', player2: 'paper'})
        expect(state[1]).toEqual({ player1: 'scissors', player2: 'scissors'})
        expect(state[2]).toEqual({ player1: 'paper', player2: 'rock'})
        expect(state[3]).toEqual({ player1: 'paper', player2: 'rock'})
    })

    it('should player1 win in 5 rounds, after 4 ties in first rounds', function () {
        game.play('rock', 'rock')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('scissors', 'scissors')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('paper', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('paper', 'paper')
        expect(game.status()).toBe(RockPaperScissors.CONTINUE)
        expect(game.winner()).toBeUndefined()

        game.play('paper', 'rock')
        expect(game.status()).toBe(RockPaperScissors.GAMEOVER)
        expect(game.winner()).toBe('romeo')

        var state = game.state()
        expect(state.length).toBe(5)
        expect(state[0]).toEqual({ player1: 'rock', player2: 'rock'})
        expect(state[1]).toEqual({ player1: 'scissors', player2: 'scissors'})
        expect(state[2]).toEqual({ player1: 'paper', player2: 'paper'})
        expect(state[3]).toEqual({ player1: 'paper', player2: 'paper'})
        expect(state[4]).toEqual({ player1: 'paper', player2: 'rock'})
    })

    it('should err if players insist to continue when game is over', function() {
        game.play('rock', 'paper')
        game.play('scissors', 'paper')
        game.play('rock', 'scissors')

        expect(function() {
            game.play('rock', 'paper')
        }).toThrowError('GAME OVER!')
    })
})