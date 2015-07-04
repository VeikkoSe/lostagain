function cameracontrollerprocess_constructor(sb) {
    let camera = sb.getCamera();
    let em = sb.getEntityManager();
    let mouseX = 0;
    let mouseY = 0;

    let init = function () {
        let mousedown = 0;

        sb.subscribe("mousedown", function (name, e) {
            mousedown = 1;

        });

        sb.subscribe("mouseup", function (name, e) {
            mousedown = 0;

        });


        sb.subscribe("mousemove", function (name, e) {

            if (mousedown === 1) {

                if(mouseX-e.clientX>0)
                {
                    sb.getCamera().setYRotation('5');
                }
                else
                {
                    sb.getCamera().setYRotation('-5');
                }

            }
            mouseX = e.clientX;


        });


        sb.subscribe("mousewheel", function (name, e) {
            if(e===-1)
            sb.getCamera().setPos(false,'-15','-15');
            else
                sb.getCamera().setPos(false,'15','15');

        });




    }

    let update = function (deltatime) {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];


            if (le.components.CameraController && le.components.RenderableComponent) {

                let re = le.components.RenderableComponent;


                camera.x = -1 * re.getXPos();
                camera.z = -1 * (re.getZPos() + camera.distance);
                camera.y = -1 * (re.getYPos() + camera.distance);


            }

        }
    }

    return {
        update, draw: function () {
        }, init
    }


}