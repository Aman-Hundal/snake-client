const {connect} = require('./client.js');
const {setupInput} = require('./input.js');


console.log("Connecting ...");
const conn = connect();

setupInput(conn); //this gives setinput function access to the connect object which represents the server/client side program. VERY IMPORTANT