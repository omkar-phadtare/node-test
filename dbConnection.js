
//var mongoUrl = "mongodb://localhost:27017/mern";
var mongoose = require('mongoose');

require('dotenv').config();

//const uri = "mongodb://0.0.0.0:27017/todo?directConnection=true&tls=false&readPreference=primary";
const uri = process.env.MONGO_URL;
//const uri = "mongodb+srv://omkar:omkar@cluster0.uxjxdhr.mongodb.net/todo?retryWrites=true&w=majority"

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}


const connectMongo = () => {
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://omkar:omkar@cluster0.uxjxdhr.mongodb.net/todo?retryWrites=true&w=majority', {
 
});
// mongoose.connect(uri, options, function(err) {
 
//       if(err) {
//         console.error(err);
//     }
//       else {
//         console.log("database connection",db)}
//     })
 }

module.exports = connectMongo;