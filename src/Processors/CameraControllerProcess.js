class CameraControllerProcess extends Processor {


    update(deltatime) {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];


            if (le.components.CameraController && le.components.Renderable) {

                var re = le.components.Renderable;


                    camera.x = -1 * re.xPos;
                    camera.z = -1 * re.zPos-220;



            }
        }
    }


}