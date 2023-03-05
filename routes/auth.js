const express = require('express');
const router = express.Router();
const userData = require('../models/User');
const pool = require('./postgresDB');
const fetchUser = require('../middleware/fetchUser');
const dotenv = require('dotenv');
dotenv.config();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "OmkarPhadtare";


// ROUTE 1 : CREATE 

//Create User  using post data
//body used for validation in Request handler parameter
router.post('/create', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),


], async (req, res) => {

    try {
        success=false;
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ errors: err.array() });
        }

        // Use bcrypt to hash password
        let salt = await bcrypt.genSalt(10);
        let securePass = await bcrypt.hash(req.body.password, salt);

        let user = await userData.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User Already exisit" })
        }

        user = await userData.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,

        });

        const data = {
            user: {
                id: user.id
            }
        }

        // Generate jaon web token
        const jwtData = jwt.sign(data, JWT_SECRET)
        success=true
        res.json({success,jwtData});

    } catch (err) {
        res.status(500).send("Some Error occure")
    }

    // const us = new userData(req.body);
    // us.save();
    // console.log(req.body);

})

//  ROUTE 2 : USERlOGIN 

router.post('/ulogin', [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Enter password min length 5').isLength({ min: 5 })
],
    async (req, res) => {


        // //bcrypt.compare(myPlaintextPassword, hash, function(err, result) {}
        // userData.findOne({email:req.body.email},'password',function(err,user){
        //     bcrypt.compare(req.body.password, user.password, function(err, result){
        //         console.log(result);
        //         res.send(result);
        //     })
        // })

        success = false;

        const {email,password} = req.body;
        try {
            let user = await userData.findOne({ email });
            if (!user) {
                return res.staus(400).json({ error: "Please try to log in with correct Credential" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({success, err: "Incorrect Password" });
            }
            

            const data = {
                user: {
                    id: user.id
                }
            }
            const jwtData = jwt.sign(data, JWT_SECRET);
            //const jwtToken = {jwtData}
            success = true;
            res.json({success,jwtData});

        } catch (err) {
            res.status(500).send({err:"Some Error occure"})
        }
    })

//Update in postgress sql

// router.put('/insert',(req,res)=>{
//     const name = req.body.name;
//     const email = req.body.email;
//     const pass = req.body.password;
//     pool.query('insert into set_user(name,email,password) values($1,$2,$3)',[name,email,pass]);
// })

//get('user/:name') specific user


// ROUTE 3 : GET USER DETAIL

router.post('/getuser', fetchUser,async (req, res) => {
        try {
            userId = req.user.id;


            const userD = await userData.findById(userId).select("-password");
            res.send(userD);
        } catch (err) {
            res.status(500).json({err:"Internal Server Error"});
        }
    })




router.get('/user', (req, res) => {

    fetchID = req.params.name;

    userData.find(function (err, val) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(val);
            console.log("Done");
        }
    })

})


router.get('/jwtID',async (req,res)=>{
    const data =await userData.find();

    res.json(data);
})


module.exports = router