precision mediump float;

// our texture
uniform sampler2D u_left;
uniform sampler2D u_right;
uniform sampler2D u_top;
uniform sampler2D u_bottom;
uniform sampler2D u_imageNorm;
uniform sampler2D u_imageDiff;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

//mouseCoordinate

uniform vec2 u_mLocation;
uniform vec2 u_cSize;

void main() {
	
	// mostly copy+paste from https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson6

	vec4 LightColor = vec4(0.9, 0.9, 0.9, 1.0);
	vec4 AmbientColor = vec4(0.10, 0.10, 0.25, 0.8);
	vec3 Falloff = vec3(0.1, 3.0, 10.0);
	
	vec3 NormalColor = texture2D( u_imageNorm, v_texCoord).rgb;
	NormalColor.g = 1.0-NormalColor.g;
    vec3 DiffuseColor = texture2D( u_imageDiff, v_texCoord).rgb;
    
    // vec3 DiffuseColor =  texture2D( u_left, v_texCoord).rgb+
    //              texture2D( u_right, v_texCoord).rgb+
    //              texture2D( u_top, v_texCoord).rgb+
    //              texture2D( u_bottom, v_texCoord).rgb;
                 
	// DiffuseColor = vec3(DiffuseColor.r);
    
    //The delta position of light
    vec2 u_mLocationFlip = vec2(u_mLocation.x, 1.0-u_mLocation.y);
    vec3 LightDir = vec3(u_mLocationFlip.xy - (gl_FragCoord.xy / u_cSize.xy), 0.105);

    //Correct for aspect ratio
    LightDir.x *= u_cSize.x / u_cSize.y;


    //normalize our vectors
    vec3 N = normalize(NormalColor * 2.0 - 1.0);
    vec3 L = normalize(LightDir);

    //Determine distance (used for attenuation) BEFORE we normalize our LightDir
    float D = length(LightDir);
    //Pre-multiply light color with intensity
    //Then perform "N dot L" to determine our diffuse term
    vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N, L), 0.0);

    //pre-multiply ambient color with intensity
    vec3 Ambient = AmbientColor.rgb * AmbientColor.a;

    //calculate attenuation
    float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );
	// Attenuation = clamp(Attenuation, 0.0, 2.0);
    //the calculation which brings it all together
    vec3 Intensity = Ambient + Diffuse * Attenuation;
    vec3 FinalColor = DiffuseColor.rgb * Intensity;
    gl_FragColor = vec4(FinalColor, 1.0);

}