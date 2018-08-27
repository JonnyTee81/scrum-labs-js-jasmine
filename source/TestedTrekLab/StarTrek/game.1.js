Game = function () {
    this.energy = 10000;
    this.torpedos = 8;
    this.maxPhaserRange = 4000;
};

Game.prototype = {
    generator: function () {
        return Math.random();
    },
    randomWithinLimitOf: function (n) {
        return Math.floor(this.generator() * n);
    },
    fireWeapon: function(ui, weaponType, target, amount){
        switch(weaponType){
            case "phaser":
                this.firePhaser(ui, target, amount);
                break;
            case "photon":
                this.firePhoton(ui, target);
                break;
            default:
                ui.writeLine("Couldn't find your weapon, bozo!");
                break;
        }
    },
    firePhaser: function(ui, target, amount){
        var weaponAmount = parseInt(amount, 10);
        var enemy = target;
        var weaponName = "phasers";
        if (this.energy >= weaponAmount) {
            distance = enemy.distance;
            if (distance > this.maxPhaserRange) {
                ui.writeLine("Klingon out of range of phasers at " + distance + " sectors...");
            } else {
                damage = weaponAmount - (((weaponAmount / 20) * distance / 200) + this.randomWithinLimitOf(200));
                if (damage < 1) {
                    damage = 1;
                }
                ui.writeLine("Phasers hit Klingon at " + distance + " sectors with " + damage + " units");
                this.hitEnemy(ui, enemy, damage);
            }
            this.energy -= amount;
        } else {
            ui.writeLine("Insufficient energy to fire phasers!");
        }
    },
    firePhoton: function (ui, target) {
        var enemy = target;
        var weaponName = "photons";
        if (this.torpedos > 0) {
            distance = enemy.distance;
            if ((this.randomWithinLimitOf(4) + ((distance / 500) + 1) > 7)) {
                ui.writeLine("Torpedo missed Klingon at " + distance + " sectors...");
            } else {
                damage = 800 + this.randomWithinLimitOf(50);
                ui.writeLine("Photons hit Klingon at " + distance + " sectors with " + damage + " units");
                this.hitEnemy(ui, enemy, damage);
            }
            this.torpedos--;
        } else {
            ui.writeLine("No more photon torpedoes!");
        }
    },
    destroyKlingon: function(ui, enemy){
        ui.writeLine("Klingon destroyed!");
        enemy.destroy();
    },
    hitEnemy: function(ui, enemy, damage, weaponName){
        if (damage < enemy.energy) {
            enemy.energy = enemy.energy - damage;
            ui.writeLine("Klingon has " + enemy.energy + " remaining");
        } else {
            this.destroyKlingon(ui, enemy);
        }
    },
    processCommand: function (ui) {
        var target = ui.variable("target");
        var command = ui.parameter("command");
        var amount = ui.parameter("amount");
        this.fireWeapon(ui, command, target, amount);
    }
};