Shield = function () {
    this.isUp = false;
    this.energyLevel = 8000;
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
            // TODO - was this from damage or transfer?
        }
    },
    raise: function () {
        this.isUp = true;
    }
};  