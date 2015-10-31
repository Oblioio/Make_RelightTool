;Aero.registerJSProgram('arrayJoin', function () {
    'use strict';

    var program = function (_settings, _scene) {

        this.scene = _scene;

        this.inputs = {
            'value1': (_settings.value1)?Number(_settings.value1):0,
            'value2': (_settings.value2)?Number(_settings.value2):0
        };

        this.outputs = {
            'value': [0,0]
        };

        this.run = function(){
            this.outputs.value = [this.inputs.value1, this.inputs.value2];
        }
    }

    return program;
    
}());