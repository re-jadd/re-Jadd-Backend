var pgPromise = require("pg-promise");
var pgInstance = pgPromise();

var config = {
  host: "localhost",
  port: 5432,
  database: "recycle_db",
  user: 'masarah'
};

var connection = pgInstance(config);

module.exports = connection;