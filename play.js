const {connect} = require('./client.js'); // this imports the connect funciton from client.js AND CALLS IT without the need to be called in this script... WhHY???

console.log("Connecting ...");
connect();