var config = {
  port: 3000,
  env: process.env.NODE_ENV,
  mongo: "mongodb://localhost:27017/data",
  timeout: 10000
}
 /* mongo: {
    user:"", pass:"",server:"localhost",
    port:27017,db:"names"
  }
*/

if (config.env === 'production')  {
  user = process.env.MONGO_USER
  pass = process.env.MONGO_PASS
}

module.exports = config
