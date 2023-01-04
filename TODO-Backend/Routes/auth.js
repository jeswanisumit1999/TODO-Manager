const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const User = require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { findOne } = require('../models/User');
const fetchUser = require("../middleware/fetchUser")
//* Create user route and send him token
router.post('/createUser',[
    body('name', "Enter valid name").isLength({min: 3}),
    body('email', "Enter valid email").isEmail(),
    body('password', "Password is too short").isLength({min: 5}),
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const {name, email, password} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.status(400).send("email already exists")
        }
        console.log(req.body)
        const encryPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: encryPassword
        }).then(
            console.log(`New User created => ${name}`)
        ).catch((err)=>{console.log(err)
            res.status(400).send('error while creating User')
        })
        user.password = undefined;

        var token = jwt.sign({ id: user._id, email: user.email }, 'shhhhh');
        res.status(200).json({token});
    }catch(err){
        console.log('error while creating user =>');
        console.log(err.message)
        res.status(500).send("error while creating user")
    }
})

//* Authnticate User and send him token
router.post('/login',[
    body('email', "Enter valid email").isEmail(),
    body('password',"Password can not be empty").exists(),
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const {name, email, password} = req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).send("invalid user credentials")
        }

        const passwordComapre = await bcrypt.compare(password, user.password);

        if(!passwordComapre){
            return res.status(400).send("invalid user credentials")
        }

        var token = jwt.sign({ id: user._id, email: user.email }, 'shhhhh');

        res.status(200).json({token});

        
    }catch(err){
        console.log('error while loging =>');
        console.log(err.message)
        res.status(500).send("error while loging")
    }
})

//* Get loggedin User details
router.post("/getUser",fetchUser, async(req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId)
        user.password = undefined
        res.status(200).json(user)
    }catch(err){
        console.log('error while fetching user details =>');
        console.log(err.message)
        res.status(500).send("error while fetching user details")
    }
})

module.exports = router;