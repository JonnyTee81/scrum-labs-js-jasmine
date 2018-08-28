describe("ship", function () {
    var game;
    var shield;

    beforeEach(function () {
        game = new Game();
        shield = new Shield();
    });

    it("should receive remaining shield hit energy", function () {
        // given
        game.subSystem = null;

        // when
        game.dispurseEnergytoSubsystem(-1000);

        // then
        expect(game.subSystem).toBeNull();

    });

    // it("should choose a random ship subsystem", function () {
    //     // given

    //     // when

    //     // then
    // });

});