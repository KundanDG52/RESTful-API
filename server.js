const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://kundan:Kundan%4098@cluster0.ufxyg.mongodb.net/restfulapi?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) console.log("Mongodb connected.");
    else console.log("Error in connecting mongodb.", error);
  }
);

mongoose.Promise = global.Promise; 

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
