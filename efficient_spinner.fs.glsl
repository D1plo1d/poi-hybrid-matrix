// Author:
// Title:
#define M_PI 3.1415926535897932384626433832795

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 toPolarCoords(vec2 coords) {
    float r = sqrt( pow(coords.x, 2.0) + pow(coords.y, 2.0) );
    float angle = atan(coords.y / coords.x);
    if (coords.x < 0.) angle = angle + M_PI;
	return vec2(r, angle);
}

void main() {

    vec3 color = vec3(.0, .0, .0);
    float radius = 0.5;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st -= vec2(0.5, 0.5);

    vec2 transformedCoords = toPolarCoords(st);
    // transformedCoords = toPolarCoords(transformedCoords);
    float r = transformedCoords.x;
    float angle = transformedCoords.y;
    angle = mod(angle + u_time, M_PI * 2.);

    if (r > .17 && r < .2) {
	    color += vec3(171./255., 0, 171./255.) * 1.0 * (M_PI * 2. - angle) / (M_PI * 2.);
	    // color += vec3(171./255., 0, 171./255.) * 1.0;
    }

    gl_FragColor = vec4(color,1.0);
}
