describe("shield command", function() {
    var game;
    var ui;
    var energyBefore;
    
    beforeEach(function() {
        game = new Game();
        energyBefore = game.energy;
        ui = new UserInterface();
        spyOn(ui, "writeLine");
    });

    it("should raise shields when command is 'shields up'", function() {
        // given
        ui.commandName = "shields up";

        // when
        game.processCommand(ui);

        // then
        expect(game.shield.isUp).toBe(true);
    });

    it("should remove energy from ship but not exceed 10000", function() {
        // given
        ui.commandName = "shield transfer";
        ui.commandParameter = 2001;

        // when
        game.processCommand(ui);

        // then
        expect(game.energy).toBe(8000);
        expect(game.shield.energyLevel).toBe(10000);
    });

    it("should not transfer energy from ship to shield if transfer amount exceeds ship current energy", function() {
        // given
        game.energy = 1000;
        ui.commandName = "shield transfer";
        ui.commandParameter = 1000;

        // when
        game.processCommand(ui);

        // then
        expect(game.energy).toBe(1000);
        expect(game.shield.energyLevel).toBe(8000);
    });

    it("should transfer energy from ship to shield if transfer amount does not exceed ship current energy", function() {
        // given
        game.energy = 1000;
        ui.commandName = "shield transfer";
        ui.commandParameter = 999;

        // when
        game.processCommand(ui);

        // then
        expect(game.energy).toBe(1);
        expect(game.shield.energyLevel).toBe(8999);
    });

    it("should not raise shields if shield subsystem is damaged", function () {
        // given - shields are damaged
        game.subSystems[1].damaged = true;
        ui.commandName = "shields up";

        // when - captain says shields up
        game.processCommand(ui);

        // then - shields do not go up
        expect(game.shield.isUp).toBe(false);

    });

    it("should not transfer any energy if shield subsystem is damaged", function () {
        // given - shields are damaged
        game.subSystems[1].damaged = true;
        ui.commandName = "shields transfer";
        ui.commandParameter = 1;

        // when - captain says shields transfer
        game.processCommand(ui);

        // then - shields do not transfer energy
        expect(game.energy).toBe(10000);
        expect(game.shield.energyLevel).toBe(8000);
    });
});
