requirejs.config({
    paths : {   
        root: '../',
        greensock: '../bower_components/greensock/src/minified',
        text: '../bower_components/text/text',
        oblio: '../bower_components/oblio-utils',
        app: 'oblio/app',
        html: '../html',
        jsonFolder: '../json'
    },
    map: {
        "*": { 
            'TweenMax': 'greensock/TweenLite.min'
        }
    },
    shim: {
    }
});

window.oblio = window.oblio || {};
oblio.app = oblio.app || {};
oblio.settings = oblio.settings || {};
    
require([
    'app/home',
    'app/uploader',
    'app/alignment',
    'app/viewer',
    'app/utils/slider',
    'app/utils/loadTracker',
    'oblio/utils/DeviceDetect'
    ], function(Home, Uploader, Alignment, Viewer, Slider) {


    function Main () {
        
        this.arrayExecuter = new Aero.utils.ArrayExecuter(this);
        
        this.home = new Home(this);
        this.uploader = new Uploader(this);
        this.alignment = new Alignment(this);
        this.viewer = new Viewer(this);
        
        this.shell = document.getElementById('shell');
        this.viewerShell = document.getElementById('viewer');
        
        this.sliders = [
            new Slider("sliderLeft", true),
            new Slider("sliderBottom", false),
            new Slider("sliderRight", true)
        ];
        
        window.onresize = handleResize.bind(this);
        window.onorientationchange = handleResize.bind(this);

        var function_arr =  [
                { fn: init, scope:this, vars: null }
            ];

        this.arrayExecuter.execute(function_arr);
    }

    function init() {
        console.log('init!');
        
        handleResize.call(this);
        
        this.gotoHome();
        
        this.shell.className = "cover active";
        
        // var sceneJSON = {"settings":{"dimensions":{"width":1600,"height":1067}},"textures":{"diffuseTexture":"~/new/full.jpg","topTex":"~/new/top.jpg","bottomTex":"~/new/below.jpg","leftTex":"~/new/left.jpg","rightTex":"~/new/right.jpg"},"JSPrograms":{"mousePos":{"id":"mousePos","dependencies":["assets/jsPrograms/mousePos.js"],"canvasCoords":true}},"GLPrograms":{"normalMap":{"vertexShader":"~/standard.vert","fragmentShader":"~/light.frag","uniforms":{"u_imageDiff":{"type":"t","val":null},"u_imageNorm":{"type":"t","val":null},"u_mLocation":{"type":"2f","val":[0.35,0.35]},"u_cSize":{"type":"2f","val":[1600,1067]}}},"combine2Normal":{"vertexShader":"~/standard.vert","fragmentShader":"~/combine2Normal.frag","uniforms":{"u_left":{"type":"t","val":null},"u_right":{"type":"t","val":null},"u_top":{"type":"t","val":null},"u_bottom":{"type":"t","val":null}}}},"connections":[{"source":{"id":"topTex"},"dest":{"id":"combine2Normal","var":"u_top"}},{"source":{"id":"bottomTex"},"dest":{"id":"combine2Normal","var":"u_bottom"}},{"source":{"id":"leftTex"},"dest":{"id":"combine2Normal","var":"u_left"}},{"source":{"id":"rightTex"},"dest":{"id":"combine2Normal","var":"u_right"}},{"source":{"id":"mousePos","var":"position"},"dest":{"id":"normalMap","var":"u_mLocation"}},{"source":{"id":"diffuseTexture"},"dest":{"id":"normalMap","var":"u_imageDiff"}},{"source":{"id":"combine2Normal"},"dest":{"id":"normalMap","var":"u_imageNorm"}},{"source":{"id":"normalMap"},"dest":{"id":"canvas"}}],"library":{"assets/jsPrograms/mousePos.js":";Aero.registerJSProgram('mousePos', function () {\n    'use strict';\n\n    var program = function (_settings, _scene) {\n\n        this.scene = _scene;\n\n        this.inputs = {\n            canvasCoords: (String(_settings.canvasCoords).toLowerCase() == \"true\")?true:false,\n            flippedY: (String(_settings.flippedY).toLowerCase() == \"true\")?true:false,\n            originX: 0,\n            originY: 0,\n            w: 0,\n            h: 0\n        };\n\n        this.outputs = {\n            'position': [0.5, 0.5],\n            'xPos': 0.5,\n            'yPos': 0.5\n        };\n\n        function mouseMove(e){\n            var mX = e.clientX || e.pageX;\n            var mY = e.clientY || e.pageY;\n            this.outputs.xPos = (mX-this.inputs.originX) / this.inputs.w;\n            this.outputs.yPos = (mY-this.inputs.originY) / this.inputs.h;\n            if(this.inputs.flippedY)this.outputs.yPos = 1-this.outputs.yPos;\n            this.outputs.position = [this.outputs.xPos,this.outputs.yPos];\n        }\n\n        function resize(e){\n            if(this.inputs.canvasCoords){\n                // coords based on canvas size\n                var bounds = this.scene.canvas.getBoundingClientRect();\n                this.inputs.w = bounds.width;\n                this.inputs.h = bounds.height;\n                this.inputs.originX = bounds.left;\n                this.inputs.originY = bounds.top;\n\n            } else {\n                // coords based on window size\n                var w = window.innerWidth;\n                var h = window.innerHeight;\n                this.inputs.w = w;\n                this.inputs.h = h;\n                this.inputs.originX = 0;\n                this.inputs.originY = 0;\n            }\n        }\n\n        $(window).on('mousemove', bind(mouseMove, this));\n        $(window).resize(bind(resize, this));\n        resize.call(this);\n    }\n\n    function bind(fn, scope){\n        return function() {\n            return fn.apply(scope, arguments);\n        }\n    }\n\n    return program;\n    \n}());","~/standard.vert":"\nattribute vec4 a_Position;\nattribute vec2 a_TexCoord;\nvarying vec2 v_texCoord;\n\nvoid main() {\n\tgl_Position = a_Position;\n\tv_texCoord = a_TexCoord;\n}","~/light.frag":"precision mediump float;\n\n// our texture\nuniform sampler2D u_left;\nuniform sampler2D u_right;\nuniform sampler2D u_top;\nuniform sampler2D u_bottom;\nuniform sampler2D u_imageNorm;\nuniform sampler2D u_imageDiff;\n\n// the texCoords passed in from the vertex shader.\nvarying vec2 v_texCoord;\n\n//mouseCoordinate\n\nuniform vec2 u_mLocation;\nuniform vec2 u_cSize;\n\nvoid main() {\n\t\n\t// mostly copy+paste from https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson6\n\n\tvec4 LightColor = vec4(0.9, 0.9, 0.9, 1.0);\n\tvec4 AmbientColor = vec4(0.10, 0.10, 0.25, 0.8);\n\tvec3 Falloff = vec3(0.1, 3.0, 10.0);\n\t\n\tvec3 NormalColor = texture2D( u_imageNorm, v_texCoord).rgb;\n\tNormalColor.g = 1.0-NormalColor.g;\n    vec3 DiffuseColor = texture2D( u_imageDiff, v_texCoord).rgb;\n    \n    // vec3 DiffuseColor =  texture2D( u_left, v_texCoord).rgb+\n    //              texture2D( u_right, v_texCoord).rgb+\n    //              texture2D( u_top, v_texCoord).rgb+\n    //              texture2D( u_bottom, v_texCoord).rgb;\n                 \n\t// DiffuseColor = vec3(DiffuseColor.r);\n    \n    //The delta position of light\n    vec2 u_mLocationFlip = vec2(u_mLocation.x, 1.0-u_mLocation.y);\n    vec3 LightDir = vec3(u_mLocationFlip.xy - (gl_FragCoord.xy / u_cSize.xy), 0.105);\n\n    //Correct for aspect ratio\n    LightDir.x *= u_cSize.x / u_cSize.y;\n\n\n    //normalize our vectors\n    vec3 N = normalize(NormalColor * 2.0 - 1.0);\n    vec3 L = normalize(LightDir);\n\n    //Determine distance (used for attenuation) BEFORE we normalize our LightDir\n    float D = length(LightDir);\n    //Pre-multiply light color with intensity\n    //Then perform \"N dot L\" to determine our diffuse term\n    vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N, L), 0.0);\n\n    //pre-multiply ambient color with intensity\n    vec3 Ambient = AmbientColor.rgb * AmbientColor.a;\n\n    //calculate attenuation\n    float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );\n\t// Attenuation = clamp(Attenuation, 0.0, 2.0);\n    //the calculation which brings it all together\n    vec3 Intensity = Ambient + Diffuse * Attenuation;\n    vec3 FinalColor = DiffuseColor.rgb * Intensity;\n    gl_FragColor = vec4(FinalColor, 1.0);\n\n}","~/combine2Normal.frag":"precision mediump float;\n\nvarying vec2 v_texCoord;\n\nuniform sampler2D u_left;\nuniform sampler2D u_right;\nuniform sampler2D u_top;\nuniform sampler2D u_bottom;\n\nfloat luma(vec3 col){\n    return (col.r+col.g+col.b)/3.;\n}\n\nvoid main() {\n    gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);\n    gl_FragColor.g += luma(texture2D( u_bottom, v_texCoord).rgb)/2.;\n    gl_FragColor.g -= luma(texture2D( u_top, v_texCoord).rgb)/2.;\n    gl_FragColor.r += luma(texture2D( u_right, v_texCoord).rgb)/2.;\n    gl_FragColor.r -= luma(texture2D( u_left, v_texCoord).rgb)/2.;\n    // gl_FragColor = texture2D( u_left, v_texCoord)+\n    // \t\t\t\ttexture2D( u_right, v_texCoord)+\n    // \t\t\t\ttexture2D( u_top, v_texCoord)+\n    // \t\t\t\ttexture2D( u_bottom, v_texCoord);\n}"}};
        
        // this.scene = new Aero.Scene(sceneJSON, {onReady:onReady.bind(this)});
        // document.body.appendChild(this.scene.canvas);
        
        // this.slideManager.transitionTo(0);
    }
    
    function onReady(){
        this.scene.renderer.start();
    }
    
    function gotoHome(){
        this.home.show();
    }
    
    function gotoUpload(){
        this.uploader.show();
    }
    
    function gotoAlign(){
        this.alignment.show();        
    }
    
    function gotoViewer(){
        this.viewer.show();        
    }
    
    function handleResize (e, callbackFn) {
        
        var w, h;
        
        w = document.body.clientWidth;
        h = document.body.clientHeight;
        
        console.log('resize: '+w+', '+h);
        
        // resize regular sections
        this.home.resize(w,h);
        this.uploader.resize(w,h);
        
        // viewer sections, lock canvas to 4/3
        
        var vertGutter = 365,
            paddingSides = 200*2,
            destRatio = 6/4,
            wSize = ((h-vertGutter)*destRatio)+paddingSides,
            hSize = ((w-paddingSides)*1/destRatio)+vertGutter,
            destW = (wSize <= w)? wSize : w,
            destH = (wSize <= w)? h : hSize;
            
        console.log('dest: '+destW+', '+destH);
        
        this.viewerShell.style.width = destW+'px';
        this.viewerShell.style.height = destH+'px';
        this.viewerShell.style.left = ((w-destW)/2)+'px';
        this.viewerShell.style.top = ((h-destH)/2)+'px';
        
        this.alignment.resize(destW,destH);
        this.viewer.resize(destW,destH);
        
        this.sliders[0].resize();
        this.sliders[1].resize();
        this.sliders[2].resize();
        
        if(callbackFn)callbackFn();
    }
    
    Main.prototype.gotoHome = gotoHome;
    Main.prototype.gotoUpload = gotoUpload;
    Main.prototype.gotoAlign = gotoAlign;
    Main.prototype.gotoViewer = gotoViewer;

    // call init on document ready
    oblio.app.main = new Main();

});
