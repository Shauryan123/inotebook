const jwt = require('jsonwebtoken');

const JWT_SECRET = "harryisagoodb$boy";

function fetchUser(req, res, next) {

    const token = req.header('auth-token');
    if (!token) {

        res.status(401).send({error:"Please authenticate using a valid token"});

    }
    try {

        const string = jwt.verify(token, JWT_SECRET);

        //returns the data

        req.user = string.user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({error:"Please authenticate using a valid token"});

    }



}

module.exports = fetchUser;