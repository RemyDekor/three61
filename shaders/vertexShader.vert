uniform float time;

// attribute vec3 position;
attribute vec3 triangleColors;

varying vec4 vColor;
varying vec3 vTriangleColors;

void main() {
    vec3 newPos = position;
    // newPos.x += cos(time)*0.5;
    // newPos.y += sin(time)*0.5;newPos
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1);
    vColor = gl_Position * 0.5 + 0.5;
    vTriangleColors = triangleColors;
}