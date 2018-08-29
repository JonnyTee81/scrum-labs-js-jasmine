Ship = function() {
    this.subSystems = [{
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
    this.selectedSubSystem = null;
    this.enemyFireEnergyUnits = 0;
    this.shield = new Shield();
}

Ship.prototype = {
    selectRandomSubsystem: function (val, ui) {
        var undamagedSubsystems = [];

        this.subSystems.forEach(function (element) {
            if (element.damaged === false) {
                undamagedSubsystems.push(element);
            }
        });
        if (undamagedSubsystems.length>0) {
            this.selectedSubSystem = this.getRandomItemFromArray(undamagedSubsystems);
        }else {
            // Finish reference $ error
            // ui.writeLine("All subsystems are damaged");
        }
    },
    damageSubsystem: function (val) {
        if (!this.selectedSubSystem.damaged) {
            if (this.selectedSubSystem.unitToStardate >= val) {
                this.selectedSubSystem.damaged = true;
            }
        }
    },
    receiveFire: function(val){
        if(this.shield.energyLevel<=val){
            this.shield.isUp = false;
        }
    },
    getRandomItemFromArray: function (itemArray) {
        return itemArray[Math.floor(Math.random() * itemArray.length)]
    }
}