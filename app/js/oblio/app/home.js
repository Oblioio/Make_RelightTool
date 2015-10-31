define([
], function () {
    
    'use strict';
    
    function Home(_main){
        this.main = _main;
    }
    
    function startup(){
        this.initialized = true;
        this.container = document.getElementById('home');
        this.getStartedBtn = document.getElementById('homeStart');
        this.getStartedBtn.addEventListener('click', function(){
            this.main.gotoUpload();
            this.hide();
        }.bind(this));
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
    
    Home.prototype.startup = startup;
    Home.prototype.show = show;
    Home.prototype.hide = hide;
    Home.prototype.shutdown = shutdown;
    Home.prototype.resize = resize;
    
    return Home;
});

