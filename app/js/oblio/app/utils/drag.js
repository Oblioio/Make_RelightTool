define([
	'app/utils/drag'
], function () {

	'use strict';
    
	function Drag(_element, _onStart, _onDrag, _onEnd){
		this.element = _element
		
		if(_onStart)this.onStart = _onStart;
		if(_onDrag)this.onDrag = _onDrag;
		if(_onEnd)this.onEnd = _onEnd;
		
		// add functions to this, binded to scope
		this.onMouseDown = onMouseDown.bind(this);
		this.onMouseMove = onMouseMove.bind(this);
		this.onMouseUp = onMouseUp.bind(this);
		this.onTouchStart = onTouchStart.bind(this);
		this.onTouchMove = onTouchMove.bind(this);
		this.onTouchEnd = onTouchEnd.bind(this);
		this.dragStart = dragStart.bind(this);
		this.dragMove = dragMove.bind(this);
		this.dragEnd = dragEnd.bind(this);
		
		// add new listeners
		addListeners.call(this);
	}
	
	Drag.prototype.destroy = function(){
		// add new listeners
		removeListeners.call(this);
		
		this.element = null;
		
		this.onStart = null;
		this.onDrag = null;
		this.onEnd = null;
		
		this.onMouseDown = null;
		this.onMouseMove = null;
		this.onMouseUp = null;
		this.onTouchStart = null;
		this.onTouchMove = null;
		this.onTouchEnd = null;
		this.dragStart = null;
		this.dragMove = null;
		this.dragEnd = null;		
	}
	
	function addListeners(){
		this.element.addEventListener('mousedown', this.onMouseDown);
		this.element.addEventListener('touchstart', this.onTouchStart);
	}
	
	function removeListeners(){
		this.element.removeEventListener('mousedown', this.onMouseDown);
		this.handle.removeEventListener('touchstart', this.onTouchStart);
		// are drag listeners still in place? remove them
		if(this.mousedrag)removeMouseDrag.call(this);
		if(this.touchdrag)removeTouchDrag.call(this);
	}
		
	/* -------------------- MOUSE LISTENERS -------------------- */
	
	function onMouseDown(e){
		e.preventDefault();
		if(this.dragging)return;
		
        this.dragStart(e.pageX, e.pageY);
        
        addMouseDrag.call(this);
	}
	
	function addMouseDrag(){
		this.mousedrag = true;
		document.body.addEventListener('mousemove', this.onMouseMove);
		document.body.addEventListener('mouseup', this.onMouseUp);
		document.body.addEventListener('mouseleave', this.onMouseUp);
		// $(document.body).on('mouseleave', this.onMouseUp);		
	}
	
	function removeMouseDrag(){
		this.mousedrag = false;
		document.body.removeEventListener('mousemove', this.onMouseMove);
		document.body.removeEventListener('mouseup', this.onMouseUp);
		document.body.removeEventListener('mouseleave', this.onMouseUp);
		// $(document.body).off('mouseleave', this.onMouseUp);		
	}
	
	function onMouseMove(e){
        this.dragMove(e.pageX, e.pageY);
		
	}
	
	function onMouseUp(e){
        this.dragEnd(e.pageX, e.pageY);
		
        removeMouseDrag.call(this);
	}
	
	
	/* -------------------- TOUCH LISTENERS -------------------- */
	
	function onTouchStart(e){
		e.preventDefault();
		if(this.dragging)return;
		
        var touch = e.touches[0];
        this.dragStart(touch.pageX, touch.pageY);
        
        addTouchDrag.call(this);
	}
	
	function addTouchDrag(){
		this.touchdrag = true;
		document.body.addEventListener('touchmove', this.onTouchMove);
		document.body.addEventListener('touchend', this.onTouchEnd);
	}
	
	function removeTouchDrag(){
		this.touchdrag = false;
		document.body.removeEventListener('touchmove', this.onTouchMove);
		document.body.removeEventListener('touchend', this.onTouchEnd);
	}
	
	
	function onTouchMove(e){
        var touch = e.touches[0];
        this.dragMove(touch.pageX, touch.pageY);
		
	}
	
	function onTouchEnd(e){
        var touch = e.changedTouches[0];
        this.dragEnd(touch.pageX, touch.pageY);
		
        removeTouchDrag.call(this);
	}
	
	/* -------------------- DRAG FUNCTIONALITY -------------------- */
		
	function dragStart(x, y){
		this.moved = false;
		this.dragging = true;
		
		// this.dragPosition.y = this.dragPosition.startY = this.dragPosition.lastY = y;
		
		if(this.onStart)this.onStart(x,y);
	}
	
	function dragMove(x, y){
		this.moved = true;
		
        // this.dragPosition.x = x;
        // this.dragPosition.y = y;      
		
		if(this.onDrag)this.onDrag(x,y);
	}
	
	function dragEnd(x, y){
		this.dragging = false;
		if(this.onEnd)this.onEnd(x,y)
        
	}	
	
	return Drag;
});
