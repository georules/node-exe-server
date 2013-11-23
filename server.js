var Sandbox = require("node-sandbox").Sandbox;
var sb = new Sandbox("./code.js");

sb.run();

sb.on("ready", function() {
  console.log("ready");
  
});

sb.on("stdout", function() {
  console.log("output");
});

sb.on("stderr", function() {
  console.log("sdjfhsdjf")
})

sb.on("exit", function() {
  console.log("exit");
});

sb.rpc.call("code").then(
  function(result){
    console.log("r" + result)
  },
  function(error) {
    console.log("e")
    console.log(error)
  }
)
