function textimer_constructor(level) {
    //constructor(level) {

    let events = {};
    //this.events['0'] = 'A';


    //}

    let init = function () {
        events['2000'] = 'What happened?';
        events['5000'] = 'We were crushed!';
        events['7000'] = 'That seems to be the case';
        events['10000'] = 'We need to heal our wounds and rebuild your ship.';
        events['12000'] = 'True. And we still have the tracker on their flag ship. We should see it on your overview map.';
        events['15000'] = 'When the time is right we will strike back!';
        events['17000'] = 'My sensor will show the nearest asteroid that we need to mine so we can get minerals for fuel';
        events['20000'] = 'Oh yes. These old ships still can\'t jump without fuel';
        events['23000'] = 'Asteroid should not be far';

        events['25000'] = ' ';
    }

    let getLevelText = function (level) {
        return events;
    }
    return {getLevelText, init}

}