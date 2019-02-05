const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/Driver");
const auth = require("../middleware/auth");
router.get("/driver", auth,user.allOrder, (req, res) => {
  // res.send("authenticated");
  res.json(res.locals.order)
  // res
});

router.get("/driver/:id", auth,  user.findOrder, (req, res) => {
  // res.send("authenticated");
  res.json(res.locals.order)
});

router.post("/auth", user.findEmail, user.login, (req, res) => {
  if (!res.user) {
    res.status(400).send("invalid email or password");
  } else {
    const { email, name, id } = req.user;

    const token = jwt.sign({ email, name, id }, process.env.JWT_KEY);

    res.send({ token });
  }
});

router.post("/users", user.findEmail, user.create, (req, res) => {
  if (res.user) {
    res.status(400).send("user is already reigister");
  } else {

    const { email,name,location, phone, id , is_admin} = req.user;

    // const email = req.user.email ;
    // const name = req.user.name ;

    const token = jwt.sign({ email,name,location, phone, id , is_admin }, process.env.JWT_KEY);

    res.send({ token });
  }
});

module.exports = router;