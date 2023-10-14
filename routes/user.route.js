import express from 'express';
import { users } from '../database/schema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const userRoute = express.Router();

userRoute.post("/add", async (req, res) => {
    
    const { fname, email, username } = req.body;

    const login = await users.findOne({ $or: [{ email: email }, { username: username }] });

    if (login !== null) {
        res.status(401).json({ message: "user exists" });
        return;
    }

    try {
        const id = await users.find({});

        const nextId = (fname[0] + (id.length + 1).toString().padStart(6, '0')).toUpperCase();
        const newUser = new users({ ...req.body, active: false, userId: nextId });
        await newUser.save();
        res.status(200).json({ message: "user created", userId: nextId });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error creating user" });
    }

})

userRoute.post("/login", async (req, res) => {

    const { username, password } = req.body.data;
    const fLogin = req.body.fLogin;

    const login = await users.findOne({ username: username });
    if (login === null) {
        res.status(401).json({ message: "invalid login" });
    }
    else if (login.active === false && fLogin === false) {
        res.status(401).json({ message: "user not active" });
    }
    else if (fLogin === true) {
        const hashPwd = bcrypt.hashSync(password, 10);
        await users.findOneAndUpdate({ username: username }, { $set: { password: hashPwd,active:true } });
        const token = jwt.sign({ user: username }, process.env.SECRET_KEY, { expiresIn: "5d" });
        res.cookie("jwt", token);
        res.status(200).json({ message: "valid login", token: token, type: login.role, user: login.username });
    }
    else {
        bcrypt.compare(password, login.password, (err, result) => {
            console.log(err,result)
            if (err) return;
            if (result === true) {
                const token = jwt.sign({ user: username }, process.env.SECRET_KEY, { expiresIn: "5d" });
                res.cookie("jwt", token);
                res.status(200).json({ message: "valid login", token: token, type: login.type, user: login.username });

            } else {
                res.status(403).json({ message: "invalid login" });
            }
        })

    }

})

userRoute.post("/reset", async (req, res) => {

    const { username, password,email } = req.body;
    
    const login = await users.findOne({ username: username,email:email });
    if (!password) {

        if (login === null) {
            res.status(401).json({ message: "invalid user" });
        }
        else {
            res.status(401).json({ message: "valid user" });
        }
    }
    else {
        try {
            const hash = bcrypt.hashSync(password,10)
            await users.findOneAndUpdate({ username: username }, { $set: { password: hash } });
            res.status(200).json({ message: "updated" });
        }
        catch (error) {
            res.status(500).json({ message: "error updating" });
            console.log(error);
        }

    }

})

userRoute.get("/list",async(req,res)=>{
    const userData = await users.find({},{__v:0,_id:0});
    res.status(200).json(userData);
})

userRoute.put("/edit", async (req, res) => {
    
    const {username,fname,lname,mobile,department} = req.body;
    try {
        await users.findOneAndUpdate({username:username},{$set:{fname:fname,lname:lname,mobile:mobile,department:department}})
        res.status(200).json({ message: "user updated"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error updating user" });
    }

})

userRoute.delete("/delete/:username",async(req,res)=>{
    
    const username = req.params.username;

    try{
        await users.deleteOne({username:username})
        res.status(200).json({ message: "user deleted"});
    }
    catch(err){
        res.status(500).json({ message: "error deleting user" });
    }
})

userRoute.put("/deactivate/:username",async(req,res)=>{
    
    const username = req.params.username;

    try{
        await users.findOneAndUpdate({username:username},{$set:{active:false}})
        res.status(200).json({ message: "user deactivated"});
    }
    catch(err){
        res.status(500).json({ message: "error deactivating user" });
    }
})

userRoute.put("/activate/:username",async(req,res)=>{
    
    const username = req.params.username;

    try{
        await users.findOneAndUpdate({username:username},{$set:{active:true}})
        res.status(200).json({ message: "user activated"});
    }
    catch(err){
        res.status(500).json({ message: "error deactivating user" });
    }
})

userRoute.get("/profile/:username",async(req,res)=>{
    
    const username = req.params.username;

    try{
        const profile = await users.findOne({username:username},{__v:0,userId:0,_id:0,active:0,department:0})
        res.status(200).json(profile);
    }
    catch(err){
        res.status(500).json({ message: "error fetching profile" });
    }
})


userRoute.put("/update",async(req,res)=>{
    
    const {username,password,fname,lname,mobile} = req.body;


    try{
        const userData = await users.findOne({username:username})
        if(password){
            userData.password = bcrypt.hashSync(password,10);
        }
        userData.fname = fname;
        userData.lname = lname;
        userData.mobile = mobile;
        await userData.save();
        res.status(200).json({ message: "user updated"});
    }
    catch(err){
        res.status(500).json({ message: "error updating user" });
    }
})


export { userRoute };