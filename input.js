//setting up a callback function to be sed in below code. This callback function takes in data (or user input) and if the input is ctrl + c itll terminate the stdin process
let connection; // this is assigned the conn object in setupInput and there now connection is a conn object WITH GLOBAL SCOPE.
let w = "Move: up";
let a = "Move: left";
let s = "Move: down";
let d = "Move: right";
let q = "Say: Move over!";

const handleUserInput = function(data) { //AS THIS IS A CALLBACK FUNCTION -> IT CAN TAKE IN DATA FROM THE STDIN.ON FUNCTION. ALSO now that the global connection variable equals the conn server object from client.js (done below in the setupInput function) this CALLBACK can ACCESS THE SERVER/SOCKET OBJ CONN.
  // THIS handler as scope from the conn object (connection global var) AND SCOPE from the stdin key board interface as its passed in as a CALLBACK in the setupinput function
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
const setupInput = function(conn) { // This allows our connection object have access to they key board data. THE CONN IS JUST A PARAM, REMEMBER THIS IS A FUNCTION DECLARATION THAT IS NOT DOING ANYHTING. ITS EXECUTED IN PLAY - AND THERE WE PASS IN THE CONNECT() FUNCTION CALL WHICH RETURNS A CONN OBJECT
  connection = conn; // IMPORTANT -> this makes the above empty connection to equal the connection object called conn. THIS GIVES YOUR ENTIRE INPUT SCRIPT ACCESS TO THE SERVER CONN OBJECT AS CONNECTION IS A GLBL VAR.  WE MUST PASS IN THE CONN OBJECT (WITH SERVER OBJECT/SOCKET FEAATURES) WHNE SETUPINPUT IS CALLED IN THE PLAY.JS PAGE TO CREATE THIS CONN OBJECT.
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


// overview of connection object:

//Before proceeding, let's think about how the connection object is being passed around:
// connect() returns an object that can be used to interact with the server
// the object returned by connect() should be passed into setupInput()
// setupInput() places a reference to that object in another variable connection which is in a global scope of that module
// When data comes in from your keyboard, the stdin event handler can now interact with the server because the scope in the handler now includes both data from the keyboard AND the connection object!
// Your input module can now use the connection variable to send movement commands/messages to the server.