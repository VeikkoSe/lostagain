attribute vec3 aVertexPosition;
attribute vec3 aWorldCoordinates;
attribute vec3 aCubeNumber;

uniform mat4 uPMatrix;
uniform mat4 uMatrix;
uniform vec3 uCameraPos;

uniform sampler2D uVisibility;
uniform float uElapsed;
//uniform sampler2D uSampler;

vec3 uWorldCoordinates =vec3(255,255,255);



void main(void) {

float x = float(floor((aCubeNumber[0]/128.0)+0.5));
float y = float(mod(aCubeNumber[0],128.0));
vec4 color = texture2D(uVisibility, vec2((x + 0.5) / 128.0, (y + 0.5) / 128.0));


mat4 cameraPos = mat4(  vec4(1,0,0,0),
                        vec4(0,1,0,0),
                        vec4(0,0,1,0),
                        vec4(uCameraPos,1));

mat4 cameraRotx = mat4( vec4(1,0,0,0),
                        vec4(0,cos(-0.785398163), -sin(-0.785398163),0),
                        vec4(0,sin(-0.785398163),cos(-0.785398163),0),
                        vec4(0,0,0,1));


uWorldCoordinates = aWorldCoordinates;

uWorldCoordinates[1] = uWorldCoordinates[1]+= uElapsed/100.0;

 //if(color[0]==1.0)
 //  uWorldCoordinates = vec3(-1000,0,0);


    //uWorldCoordinates[0] = uWorldCoordinates[0]+(0.0001*uTime);
    //if(uWorldCoordinates[0]>200.0)
    //    uWorldCoordinates[0]= 0.0;

    mat4 world = mat4(  vec4(1,0,0,0),
                        vec4(0,1,0,0),
                        vec4(0,0,1,0),
                        vec4(uWorldCoordinates,1));
//cameraRotx
    mat4 worldViewProjection  =  uPMatrix  *cameraRotx * world    * cameraPos    ;


    gl_Position = worldViewProjection * vec4(aVertexPosition, 1.0);

}
