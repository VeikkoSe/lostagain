precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
    gl_FragColor =  texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y))*vec4(1.0, 1.0, 1.0, 1.0);

}

