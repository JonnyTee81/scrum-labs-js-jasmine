Shield = function () {
    this.isUp = false;
    this.energyLevel = 8000;
    this.shieldsbuckle=false;
}

Shield.prototype = {
    changeEnergy: function (val) {
        this.energyLevel += val;
        if (this.energyLevel > 10000) {
            this.energyLevel = 10000;
            // TODO - where did the extra energy go!?
        }
        if (this.energyLevel < 0) {
            this.energyLevel = 0;
            this.shieldsbuckle = true;
        }

    },
    raise: function () {
        this.isUp = true;
    }
};
