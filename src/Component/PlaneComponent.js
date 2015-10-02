function PlaneComponent(plane) {
    //constructor(plane) {
    var name = "PlaneComponent";
    var plane = plane;


    return {
        getName: function () {
            return name
        }, getPlane: function () {
            return plane
        }
    }


}