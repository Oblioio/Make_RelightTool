define([
], function () {
    
    'use strict';
    
    var UPLOAD_MAX_DIMENSION = 2048,
        SHOW_ALIGN_TEST = true, // uploads original default images
        FAST_ALIGN_TEST = true; // if true, align test use presized default images (faster)
    
    function Uploader(_main){
        this.main = _main;
    }
    
    function startup(){
        this.initialized = true;
        this.container = document.getElementById('upload');
        this.images = [];
        this.uploadIndex = -1;
        this.uploadInput = document.getElementById('uploadInput');
        window.handleFiles = handleFiles.bind(this);
        var imageList = document.getElementById('uploadImages').getElementsByTagName("li");
        for(var i =0; i<imageList.length; i++){
            var imageObj = {
                id: imageList[i].id,
                index: i,
                li: imageList[i],
                link: imageList[i].getElementsByTagName("a")[0],
                data: null,
                uploader: this
            }
            
            imageObj.link.addEventListener('click', function(){
                this.uploader.uploadIndex = this.index;  
                this.uploader.uploadInput.click();
            }.bind(imageObj));
            
            imageObj.link.addEventListener("dragenter", function(e){
                e.stopPropagation();
                e.preventDefault();
            }.bind(imageObj), false);
            imageObj.link.addEventListener("dragover", function(e){
                e.stopPropagation();
                e.preventDefault();                
            }.bind(imageObj), false);

            imageObj.link.addEventListener("drop", function(e){
                e.stopPropagation();
                e.preventDefault();
                this.uploader.uploadIndex = this.index;
                handleFiles.call(this.uploader, e.dataTransfer.files);
            }.bind(imageObj), false);
            
            this.images.push(imageObj);
        }
        
        this.continueBtn = document.getElementById('uploadDone');
        
        if(SHOW_ALIGN_TEST){
            var alignTestBtn = this.continueBtn.cloneNode();
            document.getElementById('uploadContent').appendChild(alignTestBtn);
            alignTestBtn.innerHTML = "ALIGN TEST";
            alignTestBtn.addEventListener('click', alignTest.bind(this));
        }
        
        this.continueBtn.className = "siteButton inactive";
        this.continueBtn.addEventListener('click', continueClick.bind(this));
        
        
        this.useDefaultBtn = document.getElementById('useDefault');
        this.useDefaultBtn.addEventListener('click', useDefault.bind(this));
        
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
        
    function handleFiles(files) {
        console.log('test');
        if (!files.length) {
        } else {            
            var newImage = new Image(),
                imageIndex = this.uploadIndex;
                
            newImage.addEventListener('load', function(){
                var c = document.createElement('canvas'),
                    destScale = Math.min(1, Math.min(UPLOAD_MAX_DIMENSION/newImage.width, UPLOAD_MAX_DIMENSION/newImage.height)),
                    w = Math.round(newImage.width*destScale),
                    h = Math.round(newImage.height*destScale);
                
                // set canvas size and draw image
                c.width = w;
                c.height = h;
                
                var ctx = c.getContext('2d');
                ctx.drawImage(newImage,0,0,w,h);
                
                this.images[imageIndex].data = c.toDataURL();
                this.images[imageIndex].li.style.backgroundImage = 'url('+this.images[imageIndex].data+')';
                this.images[imageIndex].li.className = 'userImage';
                // var testImage = new Image();
                // testImage.src = this.images[imageIndex].data;
                // testImage.style.position = 'fixed';
                // document.body.appendChild(testImage);
                checkSet.call(this);
            }.bind(this));
            // console.log('loading: '+fileObj.path);
            newImage.src = window.URL.createObjectURL(files[0]);
            
            // reset input value
            this.uploadInput.value = ''
        }
    }
    
    function checkSet(){        
        var allSet = true;
        for(var i=0; i<5; i++){
            if(this.images[i].data == null){
                allSet = false;
                break;
            }
        }
        if(allSet){
            this.continueBtn.className = "siteButton";
        }
        
        return allSet;
    }
    
    function useDefault(e){
        e.preventDefault();
         
        this.main.gotoViewer();
        // this.main.gotoAlign();
        this.hide();
    }
    
    // this is just for dev, could be deleted from final build
    function alignTest(e){
        e.preventDefault();
        
        if(FAST_ALIGN_TEST){
            this.images[0].data = 'images/set1/smaller/IMG_9061.JPG';
            this.images[1].data = 'images/set1/smaller/IMG_9063.JPG';
            this.images[2].data = 'images/set1/smaller/IMG_9065.JPG';
            this.images[3].data = 'images/set1/smaller/IMG_9062.JPG';
            this.images[4].data = 'images/set1/smaller/IMG_9064.JPG';
            continueClick.call(this, e);            
            return;            
        }
                
        // null all images
        for(var i=0; i<5; i++){ this.images[i].data == null; }        
        
        // modded version of handleFiles
        function handleURL(url, index) {    
            var newImage = new Image(),
                imageIndex = index;
                
            newImage.addEventListener('load', function(){
                var c = document.createElement('canvas'),
                    destScale = Math.min(UPLOAD_MAX_DIMENSION/newImage.width, UPLOAD_MAX_DIMENSION/newImage.height),
                    w = Math.round(newImage.width*destScale),
                    h = Math.round(newImage.height*destScale);
                
                // set canvas size and draw image
                c.width = w;
                c.height = h;
                
                var ctx = c.getContext('2d');
                ctx.drawImage(newImage,0,0,w,h);
                
                this.images[imageIndex].data = c.toDataURL();
                this.images[imageIndex].li.style.backgroundImage = 'url('+this.images[imageIndex].data+')';
                this.images[imageIndex].li.className = 'userImage';
                
                checkSet.call(this);
            }.bind(this));
            
            newImage.src = url;
        }
        
        // tell it to load all 5 images
        handleURL.call(this, 'images/set1/IMG_9061.JPG', 0);
        handleURL.call(this, 'images/set1/IMG_9063.JPG', 1);
        handleURL.call(this, 'images/set1/IMG_9065.JPG', 2);
        handleURL.call(this, 'images/set1/IMG_9062.JPG', 3);
        handleURL.call(this, 'images/set1/IMG_9064.JPG', 4);
        
        // this checks every second until all 5 images are loaded, then calls continue
        function autoContinue(){
            console.log('autoContinue!');
            if(!checkSet.call(this)){
                setTimeout(autoContinue.bind(this), 1000);
                return;
            } else {
                continueClick.call(this, e);
            }
        }
        autoContinue.call(this);
    }
        
    function continueClick(e){
        e.preventDefault();
        
        console.log('continueClick!');
        
        this.main.gotoAlign();
        this.hide();
    }
    
    
    
    
    function resize(){
        if(!this.active)return;
    }
    
    
    Uploader.prototype.startup = startup;
    Uploader.prototype.show = show;
    Uploader.prototype.hide = hide;
    Uploader.prototype.shutdown = shutdown;
    Uploader.prototype.resize = resize;
    
    return Uploader;
});

