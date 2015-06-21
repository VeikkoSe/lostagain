function cameracontrollerprocess_constructor(sb) {
    let camera = sb.getCamera();

    let update = function (deltatime) {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];


            if (le.components.CameraController && le.components.Renderable) {

                let re = le.components.Renderable;


                camera.x = -1 * re.xPos;
                camera.z = -1 * (re.zPos + camera.distance);
                camera.y = -1 * (re.yPos + camera.distance);


            }

        }
    }

    return {}


}