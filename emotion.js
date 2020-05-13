const interface = require('./interface');
const grammar = require("./grammar");
const context = require("./context");
const polity = require("./polity");

let context = {};

let motivation = {
    need_for_communication:{
        value:0,
        threshold:100
    }
};
motivation.curiosity = 0;
motivation.assertion = 0;

interface.onLineEntered((line)=>{
    motivation.need_for_communication.threshold+=10;
    motivation.need_for_communication.value+=30;
    
})

setInterval(() => {
    motivation.need_for_communication.value++;
    if (motivation.need_for_communication.value>motivation.need_for_communication.threshold){
        motivation.need_for_communication.value=0;
        // manufacture an intent based on the context.
        
        
        interface.writeLine(context.formCommunication());
        if (motivation.need_for_communication.threshold>30)motivation.need_for_communication.threshold--;
    }
},5);