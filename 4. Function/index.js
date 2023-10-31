

function writeLog() {
    var string = '';
    for (var param of arguments) {
        string += `${param} `
    }
    console.log(string)
}

writeLog('hi!', 'I\'m minatttt');

