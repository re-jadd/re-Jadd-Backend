var db = require("../db/config");
var bcrypt = require("bcrypt");
var user = {};

user.login = (req, res, next) => {
  db.one("SELECT * FROM drivers WHERE email = $1;", [req.body.email])
    .then(function(result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        req.user = result;
      }
      next();
    })
    .catch(function(error) {
      console.log(error);
      next();
    });
};

user.findEmail = (req, res, next) => {
  db.oneOrNone("SELECT * FROM drivers WHERE email=$1;", [req.body.email])
    .then(function(result) {
      res.user = result;
      next();
    })
    .catch(function(error) {
      console.log(error);
      next();
    });
};

user.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  db.one(
    "INSERT INTO drivers (name , email, password, location, phone) VALUES($1, $2 , $3,$4 ,$5) RETURNING *;",
    [
      req.body.name.toLowerCase(),
      req.body.email.toLowerCase(),
      bcrypt.hashSync(req.body.password, salt),
      req.body.location,
      req.body.phone

    ]
  )
    .then(function(result) {
      req.user = result;
      next();
    })
    .catch(function(error) {
      console.log(error);
      next();
    });
};
user.allOrder = (req, res, next) => {
    db.manyOrNone("select * from orders;")
      .then((data) => {
        res.locals.order = data;
        next();
      })
      .catch((error) => {
        console.log(error)
        next();
      })
  }

  user.findOrder = (req, res, next) => {
    db.oneOrNone("SELECT orders.* , users.phone as userPhone , users.location as userlocation from users, orders where orders.user_id= users.id AND  orders.id= $1;"
, [req.params.id])
      .then((result) => {
        res.locals.order = result;
        next();
      })
      .catch(function(error) {
        console.log(error);
        next();
      });
  };
module.exports = user;