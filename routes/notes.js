const express = require('express');
const app = express();
const router = express.Router();
const pool = require('./postgresDB');
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');

const{body,validationResult} = require('express-validator');


//ROUTE 1 : FETCH ALL NOTES FROM NOTES
router.get('/fetchallnotes',fetchUser ,async (req,res)=>{

    const note = await Notes.find({user : req.user.id});
    res.json(note)

})

//ROUTE 2 : ADD NOTES 
router.post('/addnotes',
fetchUser ,
[
    body('title').isLength({min:3}),
    body('description').isLength({min:4})

],async (req,res)=>{
    try
    {  

        const {title,description,tag,background} = req.body;

        const error = await validationResult(req)

    if(!error.isEmpty())
    {
       return res.status(500).json({error:error.array()});
    }
    const data = new Notes({title,description,background,tag,user:req.user.id})

    const newnote = await data.save();

    if(newnote)
{
    res.json({"msg":"Note Added done"});
}
}catch(err){
    res.status(401).json({err:"Error occur"});
}

    // const note = await Notes.find({user : req.user.id});
    // res.json(note)
})

//ROUTE 3:UPDATE NOTES
router.put('/updatenotes/:id',fetchUser,async (req,res)=>{
    
    const {title,description,tag,background} = req.body;
    const newNote = {};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    if(background){newNote.background=background}

    let note = await Notes.findById(req.params.id)
    if(!note)
    {
        res.staus(500).json({err:"Not found"});
    }
    if(note.user.toString() != req.user.id)
{    res.status(401).send({err:"Not Allowed"});
}
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);

})

//ROUTE 4 : DELETE NOTE
router.delete('/deletenotes/:id',fetchUser,async (req,res)=>{

    stat = false;
    let noteuser = await Notes.findById(req.params.id);
    if(!noteuser)
    {
        return res.status(401).json({err:"Not found"});
    }

    if(noteuser.user.toString() != req.user.id)
    {
        return res.status(401).json({err:"Not Found"});
    }

    noteuser = await Notes.findByIdAndDelete(req.params.id)
    stat=true;
    res.json({stat,"Success":"Note has been Deleted",noteuser:noteuser});
})

// GET USER DATA USING POSTGRES SQL
// router.get('/',(req,res)=>{
//     pool.query('select * from set_user')
//     .then((result)=>{
//          console.log(result.rows);
//          res.send(result.rows)
//     })    
// })

module.exports = router