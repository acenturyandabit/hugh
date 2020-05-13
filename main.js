const interface = require('./interface');
const grammar = require("./grammar");
const context = require("./context");
const polity = require("./polity");
const emotion = require("./emotion");
const intent = require("./intent");

function synthesizeIntent() {
    let intent_instance = {
        type: undefined
    };
    if (emotion.isStrong()) {
        intent_instance.type = "express_emotion";
    } else if (polity.requires_response(context)) {
        intent_instance.type = "resolve_polity";
    } else if (intent.immediate_overrides(context)) {
        intent_instance.type = "context_response";
    } else {
        intent_instance.type = "intent_resolve";
    }
    return intent_instance;
}

function synthesizeResponse(intent_instance) {
    let response = "";
    switch (intent_instance.type) {
        case 'express_emotion':
            response = grammar.expressEmotion(emotion, context);
            break;
        case 'resolve_polity':
            response = grammar.resolvePolity(polity, context);
            break;
        case 'context_response':
        case 'intent_resolve':
            response = grammar.resolveIntent(intent, context);
            break;
    }
}

setInterval(() => {
    emotion.update();
    if (emotion.clearToRespond()) {
        intent_instance = synthesizeIntent();
        worded_intent = synthesizeResponse(intent_instance);
        interface.writeLine(worded_intent);
    }
}, 5);