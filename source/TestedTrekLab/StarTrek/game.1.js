Game = function () {
    this.e = 10000;
    this.t = 8;
    this.maxPhaserRange = 4000;
};

Game.prototype = {
    generator: function () {
        return Math.random();
    },
    randomWithinLimitOf: function (n) {
        return Math.floor(this.generator() * n);
    },
    fireWeapon: function(ui, weaponType, target){
        switch(weaponType){
            case "phaser":
                this.firePhaser(ui, target);
                break;
            case "photon":
                this.firePhoton(ui, target);
                break;
            default:
                ui.writeLine("Couldn't find your weapon, bozo!");
                break;
        }
    },
    firePhaser: function(ui, target){
        var amount = parseInt(ui.parameter("amount"), 10);
        var enemy = target;
        if (this.e >= amount) {
            distance = enemy.distance;
            if (distance > this.maxPhaserRange) {
                ui.writeLine("Klingon out of range of phasers at " + distance + " sectors...");
            } else {
                damage = amount - (((amount / 20) * distance / 200) + this.randomWithinLimitOf(200));
                if (damage < 1) {
                    damage = 1;
                }
                ui.writeLine("Phasers hit Klingon at " + distance + " sectors with " + damage + " units");
                if (damage < enemy.energy) {
                    enemy.energy = enemy.energy - damage;
                    ui.writeLine("Klingon has " + enemy.energy + " remaining");
                } else {
                    this.destroyKlingon(ui, enemy);
                }
            }
            this.e -= amount;
        } else {
            ui.writeLine("Insufficient energy to fire phasers!");
        }
    },
    firePhoton: function (ui, target) {
        var enemy = target;
        if (this.t > 0) {
            distance = enemy.distance;
            if ((this.randomWithinLimitOf(4) + ((distance / 500) + 1) > 7)) {
                ui.writeLine("Torpedo missed Klingon at " + distance + " sectors...");
            } else {
                damage = 800 + this.randomWithinLimitOf(50);
                ui.writeLine("Photons hit Klingon at " + distance + " sectors with " + damage + " units");
                if (damage < enemy.energy) {
                    enemy.energy = enemy.energy - damage;
                    ui.writeLine("Klingon has " + enemy.energy + " remaining");
                } else {
                    this.destroyKlingon(ui, enemy); 
                }
            }
            this.t--;
        } else {
            ui.writeLine("No more photon torpedoes!");
        }
    },
    destroyKlingon: function(ui, enemy){
        ui.writeLine("Klingon destroyed!");
        enemy.destroy();
    },
    processCommand: function (ui) {
        var target = ui.variable("target");
        var command = ui.parameter("command");
        this.fireWeapon(ui, command, target);
    }
};