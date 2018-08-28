describe("ship", function () {
    var game;
    var shield;

    beforeEach(function () {
        game = new Game();
        shield = new Shield();
    });

    it("ship should STOPPED if no more subsystems exist", function () {
        // given
        game.subSystems = [{
            system: 'weapons',
            unitToStardate: -300,
            damaged: true
        }, {
            system: 'shields',
            unitToStardate: -500,
            damaged: true
        }, {
            system: 'engines',
            unitToStardate: -200,
            damaged: true
        }];

        // when
        game.selectRandomSubsystem(game.subSystems);

        // then
        expect(game.selectedSubSystem).toBeNull();

    });

    it("should apply damage to subsystem", function () {
        // given
        game.selectedSubSystem = {
            system: 'weapons',
            unitToStardate: -300,
            damaged: false
        };

        // when
        // game.dispurseEnergytoSubsystem(-400);
        game.damageSubsystem(-400);

        // then
        expect(game.selectedSubSystem.damaged).toBe(true);
    });

});