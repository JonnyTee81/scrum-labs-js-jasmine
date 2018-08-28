describe("shield command", function() {
    var game;
    var ui;
    var energyBefore;
    
    beforeEach(function() {
        game = new Game();
        energyBefore = game.energy;
        ui = new UserInterface("shields");
        spyOn(ui, "writeLine");
    });

    it("should raise shields when command is 'shields up'", function() {
        // given
        ui.commandParameter = "up";

        // when
        game.processCommand(ui);

        // then
        expect(game.shield.isUp).toBe(true);
    });

    it("should remove energy from ship when command is 'shield transfer n' but not drop below 0", function() {
        // given
        ui.commandName = "shield";
        ui.commandParameter = "transfer";
        ui.target = 10001;

        // when
        game.processCommand(ui);

        // then
        expect(game.energy).toBe(0);
    });

    it("should remove energy from ship when command is 'shield transfer n' but not exceed 10000", function() {
        // given
        ui.commandName = "shield";
        ui.commandParameter = "transfer";
        ui.target = -2001;

        // when
        game.processCommand(ui);

        // then
        expect(game.energy).toBe(10000);
    });

    it("should add to reserve shields when command is 'shield transfer n' but not exceed 10000", function() {
        // given
        ui.commandName = "shield";
        ui.commandParameter = "transfer";
        ui.target = 2001;

        // when
        game.processCommand(ui);

        // then
        expect(game.shield.energyLevel).toBe(10000);
    });

    it("should transfer energy from ship to reserve shields when command is 'shield transfer n' but not drop below 0", function() {
        // given
        ui.commandName = "shield";
        ui.commandParameter = "transfer";
        ui.target = -8001;

        // when
        game.processCommand(ui);

        // then
        expect(game.shield.energyLevel).toBe(0);
    });
});
