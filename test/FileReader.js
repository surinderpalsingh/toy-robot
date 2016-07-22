var expect = require('chai').expect;
var FileReader = require('../robot/FileReader.js');


describe('FileReader', function() {
    var reader;

    beforeEach(function() {
        reader = new FileReader();
    });

    it('should return valid command based on given input', function() {
        var command = reader.parseCommandOtherThanPlace('left');
        expect(command).to.deep.equal({
            command: 'turn',
            args: 'left'
        });

        var command = reader.parseCommandOtherThanPlace('right');
        expect(command).to.deep.equal({
            command: 'turn',
            args: 'right'
        });

        var command = reader.parseCommandOtherThanPlace('left');
        expect(command).to.deep.equal({
            command: 'turn',
            args: 'left'
        });

        var command = reader.parseCommandOtherThanPlace('report');
        expect(command).to.deep.equal({
            command: 'report'
        });
    });

    it('should return a valid place command based on given input', function() {

        var command = reader.parsePlaceCommand('place 0,0,north');

        expect(command).to.deep.equal({
            command: 'place',
            args: {
                x: 0,
                y: 0,
                face: 'north'
            }
        });
    });

    it('should return array of parsed commands based on given input', function(done) {
        var rawCommands = "PLACE 0,0,NORTH\nmove\nLefT\nRight\nReport\nMOVE\nPLACE 0,5,South\nREPORT";
        reader.parseInput(rawCommands, function(err, commands) {
            expect(commands).to.deep.equal([{
                command: 'place',
                args: {
                    x: 0,
                    y: 0,
                    face: 'north'
                }
            }, {
                command: 'move'
            }, {
                command: 'turn',
                args: 'left'
            }, {
                command: 'turn',
                args: 'right'
            }, {
                command: 'report'
            }, {
                command: 'move'
            }, {
                command: 'place',
                args: {
                    x: 0,
                    y: 5,
                    face: 'south'
                }
            }, {
                command: 'report'
            }]);
            done();
        });
    });
});
