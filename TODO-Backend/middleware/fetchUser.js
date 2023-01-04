var jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) =>{
    //* Get the User from the JWT and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Invalid Token"})
    }
    try{
        const data = jwt.verify(token, 'shhhhh')
        req.user = data;
        next()
    }catch(error){
        console.log("Error => ")
        console.log(error)
        res.status(401).send({error: "Invalid Token"})
    }
}

module.exports = fetchUser;