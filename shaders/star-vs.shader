precision mediump float;
attribute vec3 aVertexPosition;

attribute float aPointSize;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;



void main(void) {

    gl_Position = uPMatrix * uMVMatrix *  vec4(aVertexPosition, 1.0);
    gl_PointSize = aPointSize;

}
