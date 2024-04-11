const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {NoteModel} = require("../models/NoteModel.js")
const {authenticator} = require("../middleware/authenticator");

const noteRouter = express.Router();
noteRouter.use(authenticator)

noteRouter.get("/",async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token,'revanth',async(err,decode)=>{
        try{
            let data = await NoteModel.find({user:decode.userId})
            res.send({
                data :data,
                message : "success",
                status :1
            })
        }catch(err){
            res.send({
                
                message : err.message,
                status :1
            })
        }
    })
   
   
})
noteRouter.patch("/",async(req,res)=>{
        let{id} = req.headers
        try{
                await NoteModel.findByIdAndUpdate({_id:id},req.body)
                res.send({
                    message:"Note Updated",
                    status:1
                })
        }catch(err){
            res.send({
                message:err.message,
                status:0
            })
        } 
})

noteRouter.delete("/",async(req,res)=>{
    let{id} = req.headers
    try{
            await NoteModel.findByIdAndUpdate({_id:id},req.body)
            res.send({
                message:"Note deleted",
                status:1
            })
    }catch(err){
        res.send({
            message:err.message,
            status:0
        })
    } 
})
noteRouter.post("/create",async(req,res)=>{
    try{
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message:"note created",
            status:1
        })
    }catch(error){
        res.send({
            message: error.message,
            status:0
        })
    }
})

module.exports={
    noteRouter
}