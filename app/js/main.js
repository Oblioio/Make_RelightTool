requirejs.config({
    paths : {   
        root: '../',
        jquery: '../bower_components/jquery/dist/jquery',
        mustache: '../bower_components/mustache/mustache',
        greensock: '../bower_components/greensock/src/minified',
        text: '../bower_components/text/text',
        FLOCK: '../bower_components/flock-utils',
        sections: 'FLOCK/sections',
        app: 'FLOCK/app',
        utils: 'FLOCK/utils',
        html: '../html',
        jsonFolder: '../json'
    },
    map: {
        "*": { 
            'TweenLite': 'greensock/TweenMax.min',
            'greensock/TweenLite.min': 'greensock/TweenMax.min',
            'greensock/TimelineLite.min': 'greensock/TweenMax.min',
            'greensock/easing/EasePack.min': 'greensock/TweenMax.min',
            'greensock/plugins/CSSPlugin.min': 'greensock/TweenMax.min'
        }
    },
    shim: {
    }
});

require([
    'jquery',
    'mustache',
    'FLOCK/utils/Polyfills',
    'FLOCK/utils/SectionLoader',
    'FLOCK/utils/Preloader',
    'FLOCK/utils/ArrayExecuter',
    'FLOCK/utils/PageVisibility',
    'FLOCK/utils/DeviceDetect'
    ], function($) {

    FLOCK = FLOCK || {};
    FLOCK.app = FLOCK.app || {};

    var preloader = FLOCK.utils.Preloader,
        arrayExecuter = new FLOCK.utils.ArrayExecuter(),
        currLoader;

    function Main () {
        this.elements = {
            shell: $('#shell'),
            window: $(window)
        }

        FLOCK.settings = FLOCK.settings || {};
        FLOCK.settings.header_height = 0;
        FLOCK.settings.footer_height = 0;
        
        FLOCK.settings.window_dimensions = {
            width: this.elements.shell.width(),
            height: this.elements.shell.height()
        };
        
        
        /* debug logs*/
        // arrayExecuter.verbose = true;

        window.onresize = handleResize.bind(this);
        window.onorientationchange = handleResize.bind(this);

        var function_arr =  [
                { fn: FLOCK.utils.SectionLoader.loadJSON, scope:FLOCK.utils.SectionLoader, vars: [FLOCK.settings.base_url + 'json/en.json', arrayExecuter.stepComplete.bind(arrayExecuter)] },
                { fn: init, scope:this, vars: null }
            ];

        arrayExecuter.execute(function_arr);
    }

    function init() {
        console.log('init!');
        
        handleResize.call(this);
        
        // this.slideManager.transitionTo(0);
    }
    
    function handleResize (e, callbackFn) {
        
        var w, h;

        FLOCK.settings.window_dimensions = {
            width: this.elements.window.width(),
            height: this.elements.window.height()
        }

        w = FLOCK.settings.window_dimensions.width;
        h = FLOCK.settings.window_dimensions.height;

        if(callbackFn)callbackFn();
    }


    // call init on document ready
    $(function () {
        FLOCK.app.main = new Main();
    });

});
