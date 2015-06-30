function cameracontrollerprocess_constructor(sb) {
    let camera = sb.getCamera();
    let em = sb.getEntityManager();

    let update = function (deltatime) {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];


            if (le.components.CameraController && le.components.RenderableComponent) {

                let re = le.components.RenderableComponent;


                camera.x = -1 * re.xPos;
                camera.z = -1 * (re.zPos + camera.distance);
                camera.y = -1 * (re.yPos + camera.distance);


            }

        }
    }

    return {
        update, draw: function () {
        }, init: function () {
        }
    }


}