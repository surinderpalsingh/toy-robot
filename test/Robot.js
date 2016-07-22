var expect = require('chai').expect;
var Robot = require('../robot/Robot.js');

describe('Robot', function() {
    var robot;

    beforeEach(function() {
        var tabelSize = {
            x: 5,
            y: 5
        };
        robot = new Robot(tabelSize);
    });

    it('should place a robot correctly on valid point on the table', function() {
        robot = robot.place({
            x: 0,
            y: 1,
            face: 'north'
        });

        console.log(robot);
        expect(robot.isPlaced).to.be.true;
        expect(robot.location).to.deep.equal({
            x: 0,
            y: 1
        });
        expect(robot.face).to.equal('north');
    });

    it("should ignore any command if given place doesn't satiafy 0 <= x <= 5 and 0 <= y <=5 ", function() {
        robot = robot.place({
            x: 0,
            y: 1,
            face: 'north'
        });
        robot = robot.place({
            x: 6,
            y: 3,
            face: 'west'
        });
        expect(robot.isPlaced).to.be.true;
        expect(robot.location).to.deep.equal({
            x: 0,
            y: 1
        });
        expect(robot.face).to.equal('north');
    });

    it('should correctly move when issued a move command', function() {
        robot = robot.place({
            x: 0,
            y: 0,
            face: 'east'
        });
        robot = robot.move();
        robot = robot.turn('left');
        robot = robot.move();
        robot = robot.turn('left');
        expect(robot.location).to.deep.equal({
            x: 1,
            y: 1
        });
        expect(robot.face).to.equal('west');
    });

    it('should correctly turn when asked to turn left or right', function() {
        robot = robot.place({
            x: 0,
            y: 1,
            face: 'east'
        });
        robot = robot.turn('left');
        expect(robot.face).to.equal('north');
    });

    it('should report current location of robot on request', function() {

        robot = robot.place({
            x: 0,
            y: 0,
            face: 'east'
        });
        robot = robot.move();
        robot = robot.turn('left');
        robot = robot.move();
        robot = robot.turn('left');
        expect(robot.location).to.deep.equal({
            x: 1,
            y: 1
        });
        expect(robot.face).to.equal('west');

        var report = robot.report();

        expect(report.face.toUpperCase() + ',' + report.location.x + "," + report.location.y).to.equal('WEST,1,1');

    });

});
