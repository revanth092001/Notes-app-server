const jwt = require("jsonwebtoken");
function authenticator(req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token,"revanth", (err, decode) => {
        
console.log("Received token:", token);

        console.log(req.headers.authorization);
        if (err) return res.send({
            message: err.message,
            status: 2
        })
   
        if (decode) {
            req.body.user = decode.userId
            next()
        } else {
            res.send({
                message: "token is not valid please login again",
                status: 2
            })
        }
    })
}

module.exports = {
    authenticator
};