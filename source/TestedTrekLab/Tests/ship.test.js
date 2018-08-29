describe("ship", function () {
    var game;
    var ship;
    var shield;
    var ui;

    beforeEach(function () {
        game = new Game();
        ship = new Ship();
        shield = new Shield();
        ui = new UserInterface();
    });

    it("Subsystems are no longer functioning on ship", function () {
        // given
        selectedSubSystem = null;
        ship.subSystems = [{
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
        ship.selectRandomSubsystem(ship.subSystems, ui);

        // then
        // expect(ui.writeLine).toHaveBeenCalledWith("All subsystems are damaged");
        expect(ship.selectedSubSystem).toBeNull();
    });

    it("should apply damage to weapons subsystem", function () {
        // given
        ship.selectedSubSystem = {
            system: 'weapons',
            unitToStardate: -300,
            damaged: false
        };

        // when
        ship.damageSubsystem(-300);

        // then
        expect(ship.selectedSubSystem.damaged).toBe(true);
    });

    it("should select a random undamaged subsystem from ship", function () {
        // given
        ship.subSystems = [{
            system: 'weapons',
            unitToStardate: -300,
            damaged: true
        }, {
            system: 'shields',
            unitToStardate: -500,
            damaged: false
        }, {
            system: 'engines',
            unitToStardate: -200,
            damaged: true
        }];

        // when
        ship.selectRandomSubsystem(ship.subSystems, ui);

        // then
        // console.log(ship.selectedSubSystem.system);
        expect(ship.selectedSubSystem.system).toBe('shields');
    });

});