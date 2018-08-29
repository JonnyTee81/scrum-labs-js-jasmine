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
            damaged: true
        }, {
            system: 'shields',
            damaged: true
        }, {
            system: 'engines',
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

    // it("should select a random undamaged subsystem from ship", function () {
    //     // given
    //     ship.subSystems = [{
    //         system: 'weapons',
    //         unitToStardate: -300,
    //         damaged: true
    //     }, {
    //         system: 'shields',
    //         unitToStardate: -500,
    //         damaged: false
    //     }, {
    //         system: 'engines',
    //         unitToStardate: -200,
    //         damaged: true
    //     }];

    //     // when
    //     ship.selectRandomSubsystem(ship.subSystems, ui);

    //     // then
    //     expect(ship.selectedSubSystem.system).toBe('shields');
    // });

    it("should select a random undamaged subsystem from ship", function () {
        // given
        spyOn(Math, "random").and.returnValue(.34);
        ship.subSystems = [{
            system: 'weapons',
            unitToStardate: -300,
            damaged: false
        }, {
            system: 'shields',
            unitToStardate: -500,
            damaged: false
        }, {
            system: 'engines',
            unitToStardate: -200,
            damaged: false
        }];

        // when
        ship.selectRandomSubsystem(ship.subSystems, ui);

        // then
        expect(ship.selectedSubSystem.system).toBe('shields');
    });

    it("Shield should remain up if energy fire does not fully deplete shield", function (){
        // // given
        // ship.enemyFireEnergyUnits = 7900;
        // shield.energyLevel = 8000;
        // shield.isUp = true;

        // // when
        // ship.receiveFire(this.enemyFireEnergyUnits);

        // // then
        // expect(shield.isUp).toBe(true);
    });

    it("Shield should buckle if fully depleted", function () {
        // // given
        // ship.enemyFireEnergyUnits = 300;
        // shield.energyLevel = 8000;
        // shield.isUp = true;

        // // when
        // ship.receiveFire(this.enemyFireEnergyUnits);

        // // then
        // expect(shield.isUp).toBe(false);
    });

    it("Calculate remaining hit energy from depleted shield", function () {
        // // given
        // ship.enemyFireEnergyUnits = 8300;
        // shield.energyLevel = 8000;

        // // when
        // ship.getRemainingEnemyHitEnergy(ship.enemyFireEnergyUnits);

        // // then
        // expect(ship.unresolvedEnergy).toBe(300);
    });

});