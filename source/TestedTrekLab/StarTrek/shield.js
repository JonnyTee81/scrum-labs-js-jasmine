Shield = function () {
    this.isUp = false;
    this.energyLevel = 8000;
    this.shieldsbuckle=false;
    this.unresolvedEnergy=0;
}

Shield.prototype = {
    changeEnergy: function (val) {
        this.energyLevel += val;
        if (this.energyLevel > 10000) {
            var excessEnergy = this.energyLevel - 10000;
            this.energyLevel = 10000;
            // TODO - where did the extra energy go!?
        }
        if (this.energyLevel < 0) {
            this.unresolvedEnergy = this.energyLevel;
            this.energyLevel = 0;
            this.shieldsbuckle = true;
        }
    },
    getEnergy: function () {
        return this.energyLevel;
    },
    raise: function () {
        this.isUp = true;
    }
};
