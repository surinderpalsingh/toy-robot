var Robot = require('./robot/Robot.js');
var FileReader = require('./robot/FileReader.js');

var tableDimensions = { x: 5, y:5};
var robot = new Robot(tableDimensions);

app = {};

var fileReader = new FileReader();


app.readAndParseFile = function(file, func) {
  fileReader.readInputFile(file, function(err, fileData) {
    if (err) {
      func(err);
      return false;
    }
    fileReader.parseInput(fileData, function(err,instructionList){

      if(err){
        func(err);
        return false;
      }
      func(null,instructionList);
    });
    //console.log(fileData);


  });
};

app.runSimulation = function(fileName, func){
    console.log('Simulation running...');

    this.readAndParseFile(fileName, function(err, instructionList) {
      if (err) {
        func(err);
        return false;
      }
      var respose = robot = robot.runCommands(instructionList);
      func(null,respose);
    });


};

module.exports = app;

var inputFile = process.argv[2];



app.runSimulation(inputFile, function(err, robot) {
  // If error, let the user know
  if (err) {
    console.log(err);
    return false;
  }

  // If no valid place commands were given, let the user know
  if (!robot.isPlaced) {
    console.log('You have not placed robot yet');
  }


});
