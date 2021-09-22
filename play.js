const net = require("net");

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: "135.23.223.133",
    port: 50542,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  // handle incomine data from server
  conn.on('data', (data) => {
    console.log('Server Says:', data);
  });

  return conn; //represents the connection you have with the server. This conn object will be used to handle msgs from the server.
};

console.log("Connecting ...");
connect(); //sets up connection to the game server and interperts incoming text as UTF. Essentially does all at once. Previously we broke down setEncoding and createConnetion as their own functions and calls
// we will be adding all of our client side code in the conn object esentialy. Such as receiveing events from the server as well