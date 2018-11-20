#define PI 3.14159265359

uniform vec2 resolution;
uniform float time;

uniform vec3 baseColor;

varying vec4 vColor;
varying vec3 vTriangleColors;

void main() {
    vec3 color = baseColor;
    vec3 timeColor = vec3( cos(time*5.)*0.5 + 0.5, cos(time*5.)*0.3 + 0.3, 0. );
    // color *= timeColor;
    // color += vColor.xyz;
    color *= vTriangleColors;
    gl_FragColor = vec4(color, 1);
}