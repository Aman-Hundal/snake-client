//setting up a callback function to be sed in below code. This callback function takes in data (or user input) and if the input is ctrl + c itll terminate the stdin process
let connection;
let w = "Move: up";
let a = "Move: left";
let s = "Move: down";
let d = "Move: right";
let q = "Say: Move over";

const handleUserInput = function(data) {
  if (data === '\u0003') {
    process.exit();
  } else if (data === "w") {
    connection.write(w);
  } else if (data === "a") {
    connection.write(a);
  } else if (data === "s") {
    connection.write(s);
  } else if (data === "d") {
    connection.write(d);
  } else if (data === "q") {
    connection.write(q);
  }
};

// setting up interface to handle user input via stdin. THIS ESSNTIALLY MAKES YOUR NODE/TERMINAL A KEYBOARD INTERFACE TO TAKE IN INPUTS
const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  //creating an event listeiner via stdin. Will use our own created function called handleUserInput as the callback param that runs when you receive and input from your keyboard.
  stdin.on('data', handleUserInput); //this is the key piece of code that creates the interface.

  return stdin; //the stdin object returned by setupInput will allow us to listen for keyboard input and react to it.
};

module.exports = {
  setupInput
}; // dont need to export the handleUserInputs function as its only called by setupInput which is already in the SAME FILE.
// the Setupinput function is already taking in and using the handle function and therefore dont need to import it.
//Since handleUserInput does not need to be called or referenced elsewhere, it does not need to be exported