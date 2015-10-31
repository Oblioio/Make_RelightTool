;Aero.registerJSProgram('controls', function () {
    'use strict';

    var program = function (_settings, _scene) {

        this.scene = _scene;

        this.inputs = {
        };

        this.outputs = {
        };

        this.init = function(callbackFn){

            this.gui = new dat.GUI();
            this.gui.domElement.style.float = "left";

            for(var value in _settings.values){
                this.outputs[value] = _settings.values[value].value;
                var ctrl = this.gui.add(this.outputs, value);
                if(_settings.values[value].min != undefined)ctrl.min(_settings.values[value].min);
                if(_settings.values[value].max != undefined)ctrl.max(_settings.values[value].max);
            }

            callbackFn();
        }

        this.run = function(){

        }
    }

    return program;
    
}());