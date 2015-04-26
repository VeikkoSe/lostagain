uniform float uTime;
uniform vec3 uCenterPosition;
uniform vec3 uPosition;
uniform float uPointsize;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

attribute vec3 aStartPosition;


varying float vLifetime;


void main(void) {


  gl_Position = uPMatrix * uMVMatrix * vec4(uPosition.x,uPosition.y,uPosition.z,1.0);
  gl_PointSize = uPointsize;
}



