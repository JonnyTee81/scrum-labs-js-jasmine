Game = function() {
    this.energy = 10000;
    this.torpedoes = 8;
    this.maxPhaserRange = 4000;
    // this.subSystems = ['weapons', 'engines', 'shields'];
    this.subSystems = [{
            system: 'weapons',
            unitToStardate: 300,
            units: 0
        },{
            system: 'shields',
            unitToStardate: 500,
            units: 0
        }, {
            system: 'engines',
            unitToStardate: 200,
            units: 0
        }];
    this.selectedSubSystem = null;

    this.shield = new Shield();
};

Game.prototype = {
    generator: function() {
        return Math.random();
    },
    randomWithinLimitOf: function(n) {
        return Math.floor(this.generator() * n);
    },
    hitKlingon: function(ui, target, damage) {
        var msg = "";
        if (damage < target.energy) {
            this.damageKlingon(ui, target, damage);
        } else {
            this.destroyKlingon(ui, target);
        }       
    },
    destroyKlingon: function(ui, target) {
        ui.writeLine("Klingon destroyed!");
        target.destroy();      
    },
    damageKlingon: function (ui, target, damage) {
        target.energy = target.energy - damage;
        ui.writeLine("Klingon has " + target.energy + " remaining");
    },
    decrementRemainingWeapon: function(weapon, amount) {
        return (weapon - amount);
    },
    checkWeaponCapacity: function (capacity, minAmount) {
        return (capacity > minAmount);
    },
    fireWeapon: function(ui, weaponType, target, amount) {
        switch(weaponType) {
            case "phaser":
                this.firePhaser(ui, target, amount);
                break;
            case "photon":
                this.firePhoton(ui, target);
                break;
            default:
                ui.writeLine("Could not locate your weapon!");
                break;
        }
    },
    firePhaser: function(ui, target, amount) {
        var distance;
        var damage;
        amount = parseInt(amount, 10);
        if (this.checkWeaponCapacity(this.energy, amount)) {
            distance = target.distance;
            if (distance > this.maxPhaserRange) {
                ui.writeLine("Klingon out of range of phasers at " + distance + " sectors...");
            } else {
                damage = amount - (((amount / 20) * distance / 200) + this.randomWithinLimitOf(200));
                if (damage < 1) {
                    damage = 1;
                }
                ui.writeLine("Phasers hit Klingon at " + distance + " sectors with " + damage + " units");
                this.hitKlingon(ui, target, damage);
            }

            this.energy = this.decrementRemainingWeapon(this.energy, amount);
        } else {
            ui.writeLine("Insufficient energy to fire phasers!");
        }
    },
    firePhoton: function(ui, target) {
        var distance;
        var damage;
        if(this.checkWeaponCapacity(this.torpedoes, 0)) {
            distance = target.distance;
            if ((this.randomWithinLimitOf(4) + ((distance / 500) + 1) > 7)) {
                ui.writeLine("Torpedo missed Klingon at " + distance + " sectors...");
            } else {
                damage = 800 + this.randomWithinLimitOf(50);
                ui.writeLine("Photons hit Klingon at " + distance + " sectors with " + damage + " units");
                this.hitKlingon(ui, target, damage);
            }
            this.torpedoes = this.decrementRemainingWeapon(this.torpedoes, 1);
        } else {
            ui.writeLine("No more photon torpedoes!");
        }       
    },
    dispurseEnergytoSubsystem: function(val){
        this.selectedSubSystem = this.getRandomItemFromArray(this.subSystems);
        console.log(this.selectedSubSystem);
    },
    getRandomItemFromArray: function (itemArray) {
        return itemArray[Math.floor(Math.random() * itemArray.length)]
    },
    transferEnergy: function (amount) {
        this.shield.changeEnergy(amount);
        this.energy -= amount;
    },
    processCommand: function(ui) {
        var target = ui.variable("target");
        var command = ui.parameter("command");
        var amount = ui.parameter("amount");
        if (command === "shields up") {
            this.shield.raise();
        }
        if (command === "shield transfer") {
            var currentShieldEnergy = this.shield.getEnergy();
            var deltaEnergy = amount;

            if (currentShieldEnergy + amount > 10000) {
                deltaEnergy = (10000 - currentShieldEnergy);
            }

            if (this.energy - deltaEnergy > 0) {
                this.transferEnergy(deltaEnergy);
            } else {
                // TODO - tell captain to pick different amount?
            }
        }
        if (command === "photon" || command === "phaser") {
            this.fireWeapon(ui, command, target, amount);
        }
    }
};