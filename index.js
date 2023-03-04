const express = require('express');
const app =  express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 5000

app.use(cors())

app.get('/',(req,res)=>{
    obj = {
        name:"omkar",
        age:"22"
    }

    res.send(obj);
})

app.listen(port,function(){
    
    console.log("Server is running on port ",{port});

})
