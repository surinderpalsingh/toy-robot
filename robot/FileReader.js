var fs = require('fs');

var FileReader = function() {};


FileReader.prototype.checkFileType = function(input) {

    var file = input.split('.');

    var len = file.length;

    // Exit if given file isn't .txt file
    if (file[len - 1] !== 'txt') {
        console.log('Simulator only accepts .txt files');
        process.exit();
    }
};
FileReader.prototype.readInputFile = function(input, func) {

    // Check given file is .txt or not
    this.checkFileType(input);


    var content = fs.readFile(input, 'utf8', function(err, content) {

        if (err) {
            func('\nFile doesn\'t exist or cannot be accessed\n');
            return false;
        }

        // If contents are empty, throw an error
        if (!content.length) {
            func('\nThe Given file is an empty file\n');
            return false;
        }
        func(null, content);
    });
};



FileReader.prototype.parseInput = function(data, func) {
    if (!data.length) {
        func("No command found");
        return false;
    }


    var dataArray = data
        .split('\n')
        .map(function(instruction) {
            return instruction.toLowerCase();
        })
        .reduce(function(instructionList, rawCommand) {

            var parsedCommand = this.parseInputCommand(rawCommand);

            if (parsedCommand) {
                instructionList.push(parsedCommand);
            }
            return instructionList;
        }.bind(this), []);

    // throw error if no instruction is parsed
    if (!dataArray.length) {
        func('No valid instruction is found');
        console.log('No valid instruction is found');
        return false;
    }


    func(null, dataArray);

};

FileReader.prototype.parseInputCommand = function(data) {


    var commands = data.split(' ');
    var parsedCommand = false;

    if (commands.length > 1 && commands[0].toLowerCase() === 'place') {
        var placeCommand = data.split('\n')[0];
        parsedCommand = this.parsePlaceCommand(placeCommand);
    } else {
        parsedCommand = this.parseCommandOtherThanPlace(data);
    }

    if (parsedCommand) {
        return parsedCommand;
    }


};



FileReader.prototype.validDirections = ['north', 'south', 'east', 'west'];

FileReader.prototype.parsePlaceCommand = function(_place) {

    var place = _place.split(' ');

    //console.log(_place);
    var command = place[0];
    var args = place[1].split(',');
    var x = parseInt(args[0]);
    var y = parseInt(args[1]);
    var face = args[2];
    if (!isNaN(x) && !isNaN(y) && this.validDirections.indexOf(face) > -1) {
        return {
            command: command,
            args: {
                x: x,
                y: y,
                face: face
            }
        };
    }

};

FileReader.prototype.parseCommandOtherThanPlace = function(inputCommand) {

    switch (inputCommand) {
        case 'move':
            return {
                command: 'move'
            };
        case 'report':
            return {
                command: 'report'
            };
        case 'left':
            return {
                command: 'turn',
                args: 'left'
            };
        case 'right':
            return {
                command: 'turn',
                args: 'right'
            };
    }
};
module.exports = FileReader;
