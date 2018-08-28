describe("shields", function () {
    var shield;

    beforeEach(function () {
        shield = new Shield();
    });

    it("should be down by default", function() {
        // given

        // when

        // then
        expect(shield.isUp).toBe(false);
    });

    it("should set shields to up when raised", function() {
        // given

        // when
        shield.raise();

        // then
        expect(shield.isUp).toBe(true);
    });


    it("should have 8000 energy units by default", function() {
        // given

        // when

        // then
        expect(shield.energyLevel).toBe(8000);
    });

    describe("changeEnergy", function() {
        it("should have a maximum of 10000 energy units", function() {
            // given

            // when
            shield.changeEnergy(2000);

            // then
            expect(shield.energyLevel).toBe(10000);
        });

        it("should not exceed 10000 energy units", function() {
            // given

            // when
            shield.changeEnergy(2001);

            // then
            expect(shield.energyLevel).toBe(10000);
        });

        it("should not drop below 0 energy units", function() {
            // given

            // when
            shield.changeEnergy(-8001);

            // then
            expect(shield.energyLevel).toBe(0);
        });

        it("should have a minimum of 0 energy units", function() {
            // given

            // when
            shield.changeEnergy(-8000);

            // then
            expect(shield.energyLevel).toBe(0);
        });

        it("should not a drop below 0 energy units", function() {
            // given

            // when
            shield.changeEnergy(-8001);

            // then
            expect(shield.energyLevel).toBe(0);
        });
    });
    describe("shieldsbuckle", function() {
        it("should buckle when energy level drops below 0 energy units", function() {
            // given

            // when
            shield.changeEnergy(-10000);

            // then
            expect(shield.shieldsbuckle).toBe(true);
        });
      });
});
