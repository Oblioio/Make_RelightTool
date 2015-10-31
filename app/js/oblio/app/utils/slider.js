define([
	'app/utils/drag'
], function (Drag) {

	'use strict';
    
	function Slider(containerID, isVertical){
		this.container = document.getElementById(containerID);
		this.label = this.container.getElementsByClassName('viewSliderLabel')[0];
		this.track = this.container.getElementsByClassName('viewSliderTrack')[0];
		this.handle = this.container.getElementsByClassName('viewSliderHandle')[0];
		this.isVertical = isVertical;
		this.dragVar = (this.isVertical)?'top':'left';
		this.trackDimension = (this.isVertical)?'clientHeight':'clientWidth';
		this.dragArgIndex = (this.isVertical)?1:0;
		
		this.value = 0;
		this.onUpdate = null;
		
		this.drag = new Drag(this.handle, dragStart.bind(this), dragUpdate.bind(this), dragEnd.bind(this));
	}
	
	function show(){
		this.container.style.visiblity = "inherit";
	}
	
	function hide(){
		this.container.style.visiblity = "hidden";
	}
	
	function reset(){
		this.onUpdate = null;
		this.setValue(0);
		this.setLabel(0);
	}
	
	
	function dragStart(x,y){
		resize.call(this); // force it to update
		
		this.startVal = this.value;
		this.dragStart = arguments[this.dragArgIndex];
		// console.log('dragStart: '+this.dragStart+', trackLength: '+this.trackLength);
	}
	
	function dragUpdate(x,y){
		var delta = arguments[this.dragArgIndex]-this.dragStart;
		// console.log('dragUpdate: '+this.dragStart+',delta: '+delta+', trackLength: '+this.trackLength);
		this.setValue(clamp(this.startVal+delta/this.trackLength));
	}
	
	function dragEnd(x,y){
		var delta = arguments[this.dragArgIndex]-this.dragStart;
		// console.log('dragEnd: '+this.dragStart+',delta: '+delta+', trackLength: '+this.trackLength);
		this.setValue(clamp(this.startVal+delta/this.trackLength));
	}
	
	function clamp(val){
		return Math.max(Math.min(1, val), 0);
	}
	
	function setValue(val){
		this.value = val;
		this.handle.style[this.dragVar] = (this.value*100)+"%";
		if(this.onUpdate)this.onUpdate();
	}
	
	function setLabel(txt){
		this.label.innerHTML = txt;
	}
	
	function resize(){
		this.trackLength = this.track[this.trackDimension];
	}
	
	
	Slider.prototype.show = show;
	Slider.prototype.hide = hide;
	Slider.prototype.reset = reset;
	Slider.prototype.setValue = setValue;
	Slider.prototype.setLabel = setLabel;
	Slider.prototype.resize = resize;
	
	return Slider;
});
