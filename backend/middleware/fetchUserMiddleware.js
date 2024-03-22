const jwt = require('jsonwebtoken');
const SECRET_KEY = "I M SECRET";

const fetchUser = async (req,res,next) => {
    const {token} = req.headers;
    const payload = jwt.verify(token,SECRET_KEY);
    req.user = payload.user;
    next();
}

module.exports = fetchUser;