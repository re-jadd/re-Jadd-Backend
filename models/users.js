var db = require("../db/config");
var bcrypt = require("bcrypt");
var user = {};
user.login = (req, res, next) => {
  db.one("SELECT * FROM users WHERE email = $1;", [req.body.email])
    .then(function (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        req.user = result;
      }
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    });
};

user.findEmail = (req, res, next) => {
  db.oneOrNone("SELECT * FROM users WHERE email=$1;", [req.body.email])
    .then(function (result) {
      res.user = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    });
};

user.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  db.one(
    "INSERT INTO users (name , email, password, location , phone) VALUES($1, $2 , $3,$4 ,$5 ) RETURNING *;",
    [
      req.body.name ? req.body.name.toLowerCase() : "",
      req.body.email ? req.body.email.toLowerCase() : "",
      bcrypt.hashSync(req.body.password, salt),
      req.body.location,
      req.body.phone
    ]
  )
    .then(function (result) {
      req.user = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    });
};
user.createOrder = (req, res, next) => {
  db.manyOrNone("INSERT INTO orders(state_order,type, size, user_id, driver_id) VALUES($1, $2 , $3,$4 ,$5 ) RETURNING *;",
    [
      req.body.state_order,
      req.body.type,
      req.body.size,
      req.body.user_id,
      req.body.driver_id
    ]
  )
    .then(function (result) {
      res.locals.order = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    });
}

user.update = (req, res, next) => {

  console.log("\n\n\n\n\n\n" , req.body)
  const salt = bcrypt.genSaltSync(10);
  db.one('UPDATE users SET name=$1, email=$2, password=$3, location=$4, phone=$5 where id=$6 RETURNING *;',
    [
      req.body.name.toLowerCase(),
      req.body.email.toLowerCase(),
      bcrypt.hashSync(req.body.password, salt),
      req.body.location,
      req.body.phone,
      req.params.id])
    .then((data) => {
      console.log("\n\n\n\n\n\n" , data)
      res.user = data;
      next();
    })
    .catch((error) => {
      console.log(error)
      next();
    })
}
user.findOrderuser = (req, res, next) => {
  db.oneOrNone("SELECT orders.* , users.phone as userPhone , users.location as userlocation from users, orders where orders.user_id= users.id AND  orders.user_id= $1;"
    , [req.params.id])
    .then((result) => {
      res.locals.order = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    });
};



module.exports = user;