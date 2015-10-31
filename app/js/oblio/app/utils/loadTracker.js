define([
	
], function () {

	'use strict';
	
	function LoadTracker(){
		this.files = {};
	}
	
	// pass an array of files that will eventually be loaded
	// for each file use the following format
	// { id: file_id, path: file_path }
	function addFiles(arr){
		for(var i=0; i<arr.length; i++){
			if(this.files[ arr[i].id ]){
				console.warn('a file with the id '+arr[i].id+' already exists')
				continue;
			}
			if(!arr[i].path)continue; // file must have a path
			// console.log('adding file: '+arr[i].id+" : "+arr[i].path);
			this.files[ arr[i].id ] = {path: arr[i].path, loaded: false, started:false};
		}
	}
	
	// pass an array of file IDs, will begin loading all of them
	function loadFiles(arr, callbackFn){
		this.addFiles(arr);
		for(var i=0; i<arr.length; i++){
			if(this.files[ arr[i].id ] && !this.files[ arr[i].id ].started){
				this.files[ arr[i].id ].started = true;
				// loadWithImageTag(this.files[ arr[i].id ]);
				loadWithAjax(this.files[ arr[i].id ]);
			}
		}
		if(callbackFn) loopCheckLoad.call(this, arr, callbackFn);
	}
	
	// old, currently unused
	function loadWithImageTag(fileObj){
		var newImage = new Image();
		$(newImage).load(function(){
			// console.log('finished loaded: '+fileObj.path);
			fileObj.loaded = true;
		});
		// console.log('loading: '+fileObj.path);
		newImage.src = fileObj.path;
	}
	
	function loadWithAjax(fileObj){
		// console.log('loadWithAjax: '+fileObj.path);
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if ( xhr.readyState == 4 ) {
                if ( xhr.status == 200 || xhr.status == 0 ) {
                    try {
                    	fileObj.loaded = true;
                    } catch ( error ) {}
                } else {}
            } 
        };
        
        xhr.open( "GET", fileObj.path, true );
        xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        xhr.setRequestHeader( "Content-Type", "text/plain" );
        xhr.send( null );        
	}
	
	function loopCheckLoad(arr, callbackFn){
		if( this.checkFiles(arr) ){
			callbackFn();
		} else {
			window.requestAnimationFrame( function(){
				loopCheckLoad.call(this, arr, callbackFn)
			}.bind(this) );
		}
	}
	
	// pass an array of file IDs, will let you know if all are loaded
	function checkFiles(arr){
		var isDone = true;
		for(var i=0; i<arr.length; i++){
			if(this.files[ arr[i].id ] && !this.files[ arr[i].id ].loaded) isDone = false;
		}
		
		return isDone;
	}
	
	LoadTracker.prototype.addFiles = addFiles;
	LoadTracker.prototype.loadFiles = loadFiles;
	LoadTracker.prototype.checkFiles = checkFiles;
	
	return LoadTracker;
});
