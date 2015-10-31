define([
    'text!root/assets/alignment/settings.json',
    'app/aero.min'
], function (sceneConfig) {
    
    'use strict';
    
    var steps = [
        {
            "description": "initial size and scale of full color image",
            "instructions": "test"
        }
    ]
    
    function Alignment(_main){
        this.main = _main;
    }
    
    function startup(){
        this.initialized = true;
        this.container = document.getElementById('viewer');
        this.canvas = document.getElementById('viewCanvas');
        
        this.main.sliders[0].show();
        this.main.sliders[0].setLabel('ADJUST OPACITY');
        
        this.main.sliders[1].show();
        this.main.sliders[1].setLabel('HORIZONTAL POSITION');
        
        this.main.sliders[2].show();
        this.main.sliders[2].setLabel('VERTICAL POSITION');
        
        this.config = JSON.parse(sceneConfig)
        this.config.textures = {
            "frontTex": this.main.uploader.images[2].data,
            "topTex": this.main.uploader.images[1].data,
            "bottomTex": this.main.uploader.images[3].data,
            "leftTex": this.main.uploader.images[0].data,
            "rightTex": this.main.uploader.images[4].data
        }
        
        console.log(this.main.uploader.images)
        this.scene = new Aero.Scene(this.config, {canvas:this.canvas});
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
        this.initialized = false;
        
        this.main.sliders[0].hide();
        this.main.sliders[1].hide();
        this.main.sliders[2].hide();
        this.main.sliders[0].reset();
        this.main.sliders[1].reset();
        this.main.sliders[2].reset();
    }
    
    function resize(){
        if(!this.active)return;
    }
    
    
    Alignment.prototype.startup = startup;
    Alignment.prototype.show = show;
    Alignment.prototype.hide = hide;
    Alignment.prototype.shutdown = shutdown;
    Alignment.prototype.resize = resize;
    
    return Alignment;
});

