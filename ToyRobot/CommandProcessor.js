'use strict';
var fs = require('fs');
var table = require('./Table');

const xMax = table.x;
const yMax = table.y;
var xPos;
var yPos;
var directions = ["EAST", "SOUTH", "WEST", "NORTH"]; 
var isPlaced = false;
var facing;
try
{
    var Commands = fs.readFileSync("./DATA/ToyRobotCommand.txt", 'utf8');
}
catch (ex) {
    console.log('Error:', ex.stack);
}

console.log("\nI'm moving with the following instructions:");
console.log("=============================================");
console.log(Commands);
console.log("=============================================");

var commandArray = getCommands(Commands);


function getCommands(commands) {
    
 
    var commandArray = commands.split("\n");
    var commandArrayTrimmed = commandArray.map(function (s) { return s.trim() });
    return commandArrayTrimmed;
};





ExecuteCommand(commandArray);

function ExecuteCommand(commandArray)
{
    try {
        if (commandArray !== null) {
            if (commandArray.length > 0) {

                for (var i = 0; i < commandArray.length; i++)
                {

                    if ((commandArray[i].split(" "))[0] == "PLACE") {
                        Place(commandArray[i]);
                    }
                    else if (isPlaced) {
                        if (commandArray[i] == "MOVE") {
                            Move();
                        }
                        else if (commandArray[i] == "LEFT") {
                            Left();
                        }
                        else if (commandArray[i] == "RIGHT") {
                            Right();

                        }
                        else if (commandArray[i] == "REPORT") {
                            Report();
                        }
                        else {
                            console.log("The command was ignored as is not valid!!");
                        }
                    }
                }
                if (!isPlaced) {
                    console.log("Please place Robot at a valid position to start traversing!!");
                }
            }
            else {
                console.log("Command File Empty!! Please enter a commmand to Execute!!");
            }
        }
    }
    catch (ex)
    {
        console.log("Sorry! An unexpected error occured!");
    }
}

function Place(placecommand) {
    xPos = (placecommand.split(" "))[1].split(",")[0];
    yPos = (placecommand.split(" "))[1].split(",")[1];
    facing = (placecommand.split(" "))[1].split(",")[2];

    if (IsPositionValid()) {
        isPlaced = true;
    }
   
};


function Move() {
    var xPosBefore = xPos;
    var yPosBefore = yPos;
    switch (facing) {
        case directions[3]:
            yPos++;
            break;
        case directions[1]:
            yPos--;
            break;
        case directions[2]:
               xPos--;
            break;
        case directions[0]:
            xPos++;
            break;
        default:
            break;
    }

    if (!IsPositionValid()) {
        xPos = xPosBefore;
        yPos = yPosBefore;
    }
};

function IsPositionValid()
{
    try {
        if ((xMax > xPos && xPos >= 0) && (yMax > yPos && yPos >= 0)) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (Ex)
    {
        console.log("Sorry! An unexpected error occured!");
        return false;
    }
}

function Right()
{
    try {
        var value = directions.indexOf(facing);
        facing = directions[((++value) % 4)];
    }
    catch (ex)
    {
        console.log("Sorry! An unexpected error occured!");
    }
}

function Left() {
    try {
        var value = directions.indexOf(facing);
        facing = directions[((--value + 4) % 4)];
    }
    catch (ex) {
        console.log("Sorry! An unexpected error occured!");
    }
}


function Report() {
    console.log("\nPosition of Robot: " + xPos + ", " + yPos + ", " + facing);
}
module.exports = {Commands };