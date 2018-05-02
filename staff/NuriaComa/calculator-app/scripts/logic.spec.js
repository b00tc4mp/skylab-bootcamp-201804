
describe('logic (calculator)', function() {
    let calc

    beforeEach(function() {
        calc = new Calculator()
    })

    it('should entering numbers 1, 2, 3, 4, 5, 6, 7, 8, 9, and 0, have status 1234567890', function() {
        calc.one()
        expect(calc.status()).toBe(1)

        calc.two()
        expect(calc.status()).toBe(12)

        calc.three()
        expect(calc.status()).toBe(123)

        calc.four()
        expect(calc.status()).toBe(1234)
        
        calc.five()
        expect(calc.status()).toBe(12345)

        calc.six()
        expect(calc.status()).toBe(123456)

        calc.seven()
        expect(calc.status()).toBe(1234567)

        calc.eight()
        expect(calc.status()).toBe(12345678)

        calc.nine()
        expect(calc.status()).toBe(123456789)

        calc.zero()
        expect(calc.status()).toBe(1234567890)
    })

    it('should 1 + 1 + 1 = 3', function() {
        calc.one()
        expect(calc.status()).toBe(1)

        calc.sum()
        expect(calc.status()).toBe(1)

        calc.one()
        expect(calc.status()).toBe(1)

        calc.sum()
        expect(calc.status()).toBe(2)

        calc.one()
        expect(calc.status()).toBe(1)

        calc.result()
        expect(calc.status()).toBe(3)
    })

    // it('should -1 + 1 = 0', function() {
    //     calc.one()
    //     expect(calc.status()).toBe(1)

    //     calc.negate()
    //     expect(calc.status()).toBe(-1)

    //     calc.sum()
    //     expect(calc.status()).toBe(-1)

    //     calc.one()
    //     expect(calc.status()).toBe(1)

    //     calc.result()
    //     expect(calc.status()).toBe(0)
    // })

    // it('should 5 - 2 - 1 = 2', function() {
    //     calc.five()
    //     expect(calc.status()).toBe(5)

    //     calc.sub()
    //     expect(calc.status()).toBe(5)

    //     calc.two()
    //     expect(calc.status()).toBe(2)

    //     calc.sub()
    //     expect(calc.status()).toBe(3)

    //     calc.one()
    //     expect(calc.status()).toBe(1)

    //     calc.result()
    //     expect(calc.status()).toBe(2)
    // })

    // it('should 5 * 2 * 3 = 30', function() {
    //     calc.five()
    //     expect(calc.status()).toBe(5)

    //     calc.mul()
    //     expect(calc.status()).toBe(5)

    //     calc.two()
    //     expect(calc.status()).toBe(2)

    //     calc.mul()
    //     expect(calc.status()).toBe(10)

    //     calc.three()
    //     expect(calc.status()).toBe(3)

    //     calc.result()
    //     expect(calc.status()).toBe(30)
    // })

    // it('should 30 / 3 / 2 = 5', function() {
    //     calc.three()
    //     expect(calc.status()).toBe(3)

    //     calc.zero()
    //     expect(calc.status()).toBe(30)

    //     calc.div()
    //     expect(calc.status()).toBe(30)

    //     calc.three()
    //     expect(calc.status()).toBe(3)

    //     calc.div()
    //     expect(calc.status()).toBe(10)

    //     calc.two()
    //     expect(calc.status()).toBe(2)

    //     calc.result()
    //     expect(calc.status()).toBe(5)
    // })
})