var Stream = require('stream')
var express = require('express');
var app = express(); 
var mongo = require('mongoskin')
var settings = require('./settings')
var db = mongo.db(settings.mongo, {safe:true})

var dataout = db.collection("data")

var testid = "528d0a4dcb2ecac7de000001";

dataout.appendById = function(id, data) {
  that = this
  this.findById(id, function (e,r) {
    data.data = r.data + data.data
    that.updateById(id,data)
  })
}

var runapp = function() {
  dataout.updateById(testid, {data:""})
  var spawn = require('child_process').spawn;
  // sandbox-exec -f sbox cowsay hello
  //var cmd = spawn("sandbox-exec", ["-f","./sbox","cowsay","MOO"])
  var cmd = spawn("node", ["./code.js"])
  cmd.stdout.on("data", function(data) {
    data = data.toString('utf8')
    dataout.appendById(testid,{data:data})
  })
  setTimeout(function() {
    dataout.appendById(testid,{data:"killit"})
    cmd.kill()
    console.log("killed")
  }, settings.timeout)
}

var seedata = function(res) {
  dataout.findById(testid, function (e,r) {
    res.send(r)
  })
}

app.get('/run', function (req,res) {
  res.set({'Content-Type':'text/plain'})
  runapp()
  res.send("running")
})

app.get('/see', function (req,res) {
  res.set({'Content-Type':'text/plain'})
  seedata(res)
})

app.listen(settings.port)
console.log("running on " + settings.port)
