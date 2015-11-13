precision mediump float;

uniform sampler2D uSampler;
varying vec2 vTexCoords;

void main()
{
    vec4 normalColor = texture2D(uSampler, vTexCoords);
    float gray = 0.299*normalColor.r + 0.587*normalColor.g + 0.114*normalColor.b;
    gl_FragColor =vec4(gray, gray, gray, normalColor.a);
       // gl_FragColor = texture2D(uSampler, vTexCoords);
}