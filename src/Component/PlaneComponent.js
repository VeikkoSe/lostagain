function PlaneComponent(plane) {
    //constructor(plane) {
    var name = 'PlaneComponent';

    return Object.freeze({
        getName: function() {
            return name;
        }, getPlane: function() {
            return plane;
        }
    });

}
