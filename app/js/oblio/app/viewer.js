define([
    'app/aero.min'
], function () {
    
    'use strict';
    
    function Viewer(_main){
        this.main = _main;
    }
    
    function startup(){
        this.initialized = true;
        this.container = document.getElementById('viewer');
        
        this.main.sliders[0].show();
        this.main.sliders[0].setLabel('ADJUST SATURATION');
    }
    
    function show(){
        // show section
        this.active = true;
        if(!this.initialized)this.startup();
        
        this.container.style.visibility = 'visible';
    }
    
    function hide(callback){
        this.active = false;
        
        this.container.style.visibility = 'hidden';
        
        if(callback)callback();
    }
    
    function shutdown(){
        
    }
    
    function resize(){
        if(!this.active)return;
    }
    
    
    Viewer.prototype.startup = startup;
    Viewer.prototype.show = show;
    Viewer.prototype.hide = hide;
    Viewer.prototype.shutdown = shutdown;
    Viewer.prototype.resize = resize;
    
    return Viewer;
});

