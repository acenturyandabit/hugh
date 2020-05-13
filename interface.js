const readline = require('readline');

let input = '';

readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY)process.stdin.setRawMode(true);
process.stdin.on('keypress', registerInput)
let lineEnteredHandlers=[];

function registerInput(str, key) {
    if (key.name === 'backspace') {
        input = input.slice(0, input.length - 1);
    } else if (key.name === 'return') {
        if (input=="EXITNOW")process.exit(0);
        lineEnteredHandlers.forEach(i => i(input));
        process.stdout.write("\n");
        input = "";
    } else {
        input += str;
    }
    render(input);
}

function render(input) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(input);
}


module.exports = {
    onLineEntered: (fn) => {
        lineEnteredHandlers.push(fn);
    },
    writeLine: (line) => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(line+"\n");
        process.stdout.write(input);
    }
}