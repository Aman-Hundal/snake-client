const {connect} = require('./client.js');
console.log("Connecting ...");
connect();

//setting up a callback function to be sed in below code. This callback function takes in data (or user input) and if the input is ctrl + c itll terminate the stdin process
const handleUserInput = function(data) {
  if (data === '\u0003') {
    process.exit();
  }
};

// setting up interface to handle user input via stdin
const setupInput = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  //creating an event listeiner via stdin. Will use our own created function called handleUserInput as the callback param that runs when you receive and input from your keyboard.
  stdin.on('data', handleUserInput);

  return stdin; //the stdin object returned by setupInput will allow us to listen for keyboard input and react to it.
};

setupInput();