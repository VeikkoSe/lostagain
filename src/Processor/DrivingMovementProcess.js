/*
 class DrivingMovementProcess extends Processor {
 constructor() {


 }


 update(deltatime) {

 for (let e = 0; e < em.entities.length; e++) {
 let le = em.entities[e];


 if (le.components.Drivable) {

 let mm = le.components.Drivable;
 let re = le.components.Renderable;



 let dirVectorX = Math.cos(degToRad(re.angleY));
 let dirVectorZ = Math.sin(degToRad(re.angleY));

 if (mm.addSpeed) {

 mm.velocityX += mm.acceleration * dirVectorX * (deltatime / 1000);
 mm.velocityZ += mm.acceleration * dirVectorZ * (deltatime / 1000);

 }

 if (mm.reduceSpeed) {

 mm.velocityX -= mm.acceleration * dirVectorX * (deltatime / 1000);
 mm.velocityZ -= mm.acceleration * dirVectorZ * (deltatime / 1000);

 }

 if (mm.rotateRight) {

 if (re.angleY >= 360)
 re.angleY = 0;

 if (re.angleY < 0)
 re.angleY = 360;

 re.angleY -= 600 * (deltatime / 1000);
 }
 if (mm.rotateLeft) {

 if (re.angleY >= 360)
 re.angleY = 0;

 if (re.angleY < 0)
 re.angleY = 360;
 re.angleY += 600 * (deltatime / 1000);
 }

 re.xPos += mm.velocityX * (deltatime / 1000);
 re.zPos -= mm.velocityZ * (deltatime / 1000);

 //console.log(re.xPos);
 }
 }
 }
 }
 */