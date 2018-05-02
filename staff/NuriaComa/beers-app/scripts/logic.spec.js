'use strict';

describe('logic (beers)', function() {
    it('should search beers', function(done) {
        logic.searchBeers('watafac', function(beers) {
            expect(beers).toBeDefined();

            expect(beers.length).toBe(4);

            done();
        });
    });

    it('should get beer info', function(done) {
        logic.getBeerInfo('xnRniA', function(beer) {
            expect(beer).toBeDefined();

            expect(beer.id).toBe('xnRniA');

            done();
        });
    });
});