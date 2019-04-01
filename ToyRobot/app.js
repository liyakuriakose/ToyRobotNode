'use strict';
console.log("\n Hi There! Let's go for a walk!!!" +
    "\n Please enter the commands in the command text file." +
    "\n PLACE X,Y,F \n MOVE \n LEFT \n RIGHT\n REPORT");
var CommandProcessor = require('./CommandProcessor.js');
process.openStdin();