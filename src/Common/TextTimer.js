class TextTimer {
    constructor(level) {

        this.events = {};
        //this.events['0'] = 'A';


        this.events['2000'] = 'What happened?';
        this.events['5000'] = 'We were crushed!';
        this.events['7000'] = 'That seems to be the case';
        this.events['10000'] = 'We need to heal our wounds and rebuild your ship.';
        this.events['12000'] = 'True. And we still have the tracker on their flag ship. We should see it on your overview map.';
        this.events['15000'] = 'When the time is right we will strike back!';
        this.events['17000'] = 'My sensor will show the nearest asteroid that we need to mine so we can get minerals for fuel';
        this.events['20000'] = 'Oh yes. These old ships still can\'t jump without fuel';
        this.events['23000'] = 'Asteroid should not be far';


    }

    getLevelText(level) {
        return this.events;
    }

}