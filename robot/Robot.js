var Robot = function(tabelSize) {
    this.isPlaced = false;
    this.location = {
        x: 0,
        y: 0
    };
    this.face = null;
    this.tableSize = tabelSize;
};

/**
 * Left, right direction of robot based on current diection
 */
var directionMap = {

    north: {
        value: 'north',
        left: 'west',
        right: 'east'
    },
    east: {
        value: 'east',
        left: 'north',
        right: 'south'
    },
    south: {
        value: 'south',
        left: 'east',
        right: 'west'
    },
    west: {
        value: 'west',
        left: 'south',
        right: 'north'
    }
};

Robot.prototype.runCommands = function(commands) {

    // keep track of current starte of robot
    var robot = this;
    var command;
    // Run all command one bye one
    for (var i = 0; i < commands.length; i++) {
        command = commands[i];
        if (command.args) {
            robot = this[command.command](command.args);
        } else {
            robot = this[command.command]();
        }
    }
    return robot;
};

Robot.prototype.place = function(args) {
    // ignore if robot is placed out of table dimensions
    if (args.x > this.tableSize.x || args.y > this.tableSize.y) {
        return this;
    }

    this.location.x = args.x;
    this.location.y = args.y;
    this.face = args.face;
    this.isPlaced = true;
    return this;
};


Robot.prototype.turn = function(turn) {
    if (!this.isPlaced) {
        return this;
    }
    var newDirection = directionMap[this.face][turn];
    if (newDirection) {
        this.face = newDirection;
    }
    return this;
};

/**
 * Move robot by one step until 0 <= x <= 5 and 0 <= y <=5 conditions are statisfied,
 * otherwise ignore move command
 */
Robot.prototype.move = function() {
    if (!this.isPlaced) {
        return this;
    }
    var x = this.location.x;
    var y = this.location.y;
    switch (this.face) {
        case 'north':
            if (++y <= this.tableSize.y) {
                this.location = {
                    x: x,
                    y: y
                };
            }
            break;
        case 'east':
            if (++x <= this.tableSize.x) {
                this.location = {
                    x: x,
                    y: y
                };
            }
            break;
        case 'south':
            if (--y >= 0) {
                this.location = {
                    x: x,
                    y: y
                };
            }
            break;
        case 'west':
            if (--x >= 0) {
                this.location = {
                    x: x,
                    y: y
                };
            }
            break;
    }
    return this;
};

Robot.prototype.report = function() {

    if (!this.isPlaced) {
        return this;
    }
    // TODO use spritf patteren
    console.log('Current location of robot is ' + this.location.x + ',' + this.location.y + ',' + this.face.toUpperCase());
    return this;
};

module.exports = Robot;
