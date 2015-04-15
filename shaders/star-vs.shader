precision mediump float;
attribute vec3 aVertexPosition;
attribute vec3 aWorldCoordinates;
attribute float aPointSize;

uniform mat4 uPMatrix;
//uniform vec3 uView;
uniform mat4 uMVMatrix;



void main(void) {

  //mat4 model = mat4(  vec4(1,0,0,0),
   //                     vec4(0,1,0,0),
   //                     vec4(0,0,1,0),
   //                     vec4(aWorldCoordinates,1));

 //mat4 view = mat4(  vec4(1,0,0,0),
  //                       vec4(0,1,0,0),
  //                       vec4(0,0,1,0),
  //                       vec4(uView,1));

  //world = mat4(  vec4(1,0,0,0),
   //                     vec4(0,1,0,0),
   //                     vec4(0,0,1,0),
   //                     vec4(1,0,0,1));
   //                        gl_Position = vec4(1.0,0.0,0.0,1) * world;
//    gl_Position = vec4(aVertexPosition,1.0);
    gl_Position = uPMatrix * uMVMatrix *  vec4(aVertexPosition, 1.0);
//        gl_PointSize = 1.0;

    gl_PointSize = aPointSize;

}
