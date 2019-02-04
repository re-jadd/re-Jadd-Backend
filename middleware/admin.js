const admin = (req, res, next) => {
    if(req.user.is_admin){
    next()
    }
    else {
    res.status(404).send("an authorized");
    }
};

module.exports = auth;