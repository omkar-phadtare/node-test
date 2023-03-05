// var http = require('http');

// var dt = require('./todayDate')

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('Todays Date : '+ dt.myDateTime())
//   res.end('Hello World!');
// }).listen(8080);

const express = require('express');
const app = express();

const connectMongo = require('./dbConnection');

const mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config();

const t = connectMongo();


app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/auth' ,require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.use('/api/register',require('./routes/register'));
app.use('/api/v1/work',require('./routes/WorkerAuth'));

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

  app.use(express.urlencoded({extended:false}));
  app.use(
    cors({
        origin:["http://localhost:5000","https://daily-ment.onrender.com"],
    })
  )

app.listen(port,function(){
    
    console.log("Server is running on port ",{port});

})

