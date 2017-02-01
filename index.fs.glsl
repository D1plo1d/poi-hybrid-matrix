// Author:
// Title:
#define M_PI 3.1415926535897932384626433832795

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Constants
#define TRAIL_SAMPLE_POINTS 200
float trail_length = M_PI*2.0;

float ball_radius = 0.017;
float hand_radius = 0.01;
float arm_radius = 0.25 - ball_radius;
float tether_radius = 0.25 - ball_radius;

int FLOWER = 0;
int C_CAP = 1;

int FORWARD = 1;
int REVERSE = -1;

// Pattern configs
int left_pattern = FLOWER;
int left_flower_ratio = 4;
int left_direction = REVERSE;
int left_flower_petal_direction = REVERSE;

int right_pattern = FLOWER;
int right_flower_ratio = 4;
int right_direction = FORWARD;
int right_flower_petal_direction = FORWARD;

// int right_pattern = FLOWER;
// int right_flower_ratio = 3;
// int right_direction = FORWARD;
// int right_flower_petal_direction = REVERSE;

// Pattern helpers
vec2 circle(float radius, int direction, float speed, float timing_offset) {
    float t = (u_time  + timing_offset) * speed;
    return vec2(
        cos(float(direction) * t) * radius,
        sin(float(direction) * t) * radius
    );
}

// Pattern implementations
vec2 static_spin(float timing_offset, int direction) {
    return circle(tether_radius, direction, 1.0, timing_offset);
}

vec2 extension(float timing_offset, int direction) {
    return circle(arm_radius + tether_radius, direction, 1.0, timing_offset);
}

vec2 second_order_flower(
  int ratio,
  float timing_offset,
  int direction,
  int petal_direction
) {
	float petal_offset = timing_offset;
    if (ratio == 4) {
	    petal_offset += M_PI / 3.0;
    }
    vec2 pos = vec2(0.0, 0.0);
    pos += circle(arm_radius, direction, 1.0, timing_offset);
    pos += circle(tether_radius, petal_direction, float(ratio), petal_offset);
    return pos;
}

vec2 c_cap(
  float timing_offset,
  int direction,
  int petal_direction
) {
    // TODO: This is very fucked
    float time_mod_2pi = mod(u_time + timing_offset, M_PI * 2.0) ;
    if (time_mod_2pi >  M_PI * 12. / 15. && time_mod_2pi <  M_PI * 24. / 15.) {
      return second_order_flower(4, timing_offset + M_PI * 6. / 15., direction, petal_direction);
    } else {
      return extension(timing_offset + M_PI * 6. / 15., -direction);
    }
}

vec2 c_cap_hand(
  float timing_offset,
  int direction,
  int petal_direction
) {
    float time_mod_2pi = mod(u_time + timing_offset, M_PI * 2.0) ;
    if (time_mod_2pi >  M_PI) {
	    return circle(arm_radius, direction, 1.0, timing_offset);
    } else {
	    return circle(arm_radius, -direction, 1.0, timing_offset);
    }
}


vec3 color_for_pattern(
  vec2 st,
  int pattern,
  int flower_ratio,
  int direction,
  int flower_petal_direction
) {

    float offset = 0.0;
    float trail_progress = 0.0;
    float decay = 0.0;
    vec2 hand_position = vec2(.0, .0);
    vec2 prop_position = vec2(0.0, 0.0);

    for (int i = TRAIL_SAMPLE_POINTS - 1; i >= 0; i--) {
        trail_progress = float(i) / float(TRAIL_SAMPLE_POINTS);
        offset = trail_progress * trail_length;
        // decay = pow(trail_progress, 1.0);
        decay = trail_progress;

        if (pattern == FLOWER) {
            prop_position = second_order_flower(flower_ratio, offset, direction, flower_petal_direction);
	        hand_position = circle(arm_radius, direction, 1.0, offset);
        } else if (pattern == C_CAP) {
          hand_position = c_cap_hand(offset, direction, flower_petal_direction);
          prop_position = c_cap(offset, direction, flower_petal_direction);
        }
    	prop_position += vec2(0.5, 0.5);

        hand_position += vec2(0.5, 0.5);

        // Draw Hand
        if ( distance(st, hand_position) < hand_radius) {
            return vec3(decay, decay, decay);
        }

        // Draw Poi
        if ( distance(st, prop_position) < ball_radius) {
            return vec3(decay,  decay, decay);
        }
    }
    return vec3(0, 0, 0);
}

void main() {

    vec3 color = vec3(.0, .0, .0);

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    color += vec3(171./255., 0, 171./255.) * 1.5 * color_for_pattern(
        st, left_pattern, left_flower_ratio, left_direction, left_flower_petal_direction
    );
    color += vec3(0, 171./255., 158./255.) * 2.0 * color_for_pattern(
        st, right_pattern, right_flower_ratio, right_direction, right_flower_petal_direction
    );

    gl_FragColor = vec4(color,1.0);
}
