function cameracontrollerprocess_constructor(sb) {
    "use strict";

    var camera = sb.getCamera();
    var em = sb.getEntityManager();
    var mouseX = 0;
    var mouseY = 0;
    var degreeAlt = Math.PI / 180;

    var init = function () {
        var mousedown = 0;

        sb.subscribe("mousedown", function (name, e) {
            mousedown = 1;

        });

        sb.subscribe("mouseup", function (name, e) {
            mousedown = 0;
        });


        sb.subscribe("mousemove", function (name, e) {

            if (mousedown === 1) {
                if (mouseX - e.clientX > 0) {
                    camera.setYRotation('20');
                }
                else {
                    camera.setYRotation('-20');
                }
            }
            mouseX = e.clientX;

        });

        sb.subscribe("mousewheel", function (name, e) {
            if (e === -1)
                sb.getCamera().setDistance('10');
            else

                sb.getCamera().setDistance('-10');
        });
    };

    var update = function (deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.CameraTargetComponent && le.components.RenderableComponent) {

                var re = le.components.RenderableComponent;

                var mvMatrix = camera.getMVMatrix();


                var x = camera.getDistance() * Math.cos(camera.getYRotation() * degreeAlt) + re.getXPos();
                var z = camera.getDistance() * Math.sin(camera.getYRotation() * degreeAlt) + re.getZPos();
                //
                var zComponent = re.getZPos() - camera.getZPos();
                var xComponent = re.getXPos() - camera.getXPos();
                var y = Math.sqrt(zComponent * zComponent + xComponent * xComponent) * Math.tan(camera.getPitch() * degreeAlt);

                camera.setXPos(x);
                camera.setYPos(y);
                camera.setZPos(z);

                //console.log(camera.getYPos());

                // }

                mat4.lookAt([camera.getXPos(), camera.getYPos(), camera.getZPos()], [re.getXPos(), 0, re.getZPos()], [0, 1, 0], mvMatrix);

                //camera.lookAt([re.getXPos(),0,re.getZPos()],[0,1,0]);

            }

        }
    };
    return {
        update, draw: function () {
        }, init
    }
}