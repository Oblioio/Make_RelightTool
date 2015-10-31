precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_left;
uniform sampler2D u_right;
uniform sampler2D u_top;
uniform sampler2D u_bottom;

float luma(vec3 col){
    return (col.r+col.g+col.b)/3.;
}

void main() {
    gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
    gl_FragColor.g += luma(texture2D( u_bottom, v_texCoord).rgb)/2.;
    gl_FragColor.g -= luma(texture2D( u_top, v_texCoord).rgb)/2.;
    gl_FragColor.r += luma(texture2D( u_right, v_texCoord).rgb)/2.;
    gl_FragColor.r -= luma(texture2D( u_left, v_texCoord).rgb)/2.;
    // gl_FragColor = texture2D( u_left, v_texCoord)+
    // 				texture2D( u_right, v_texCoord)+
    // 				texture2D( u_top, v_texCoord)+
    // 				texture2D( u_bottom, v_texCoord);
}