// **************************************************
// this file is the setup of of our mongoose template 
// to store data to our MongoBD Atlas 
// **************************************************

const mongoose = require('mongoose');
const config = require('config');

// db is a set variable to get any of the variables in the config default.json
// in this case, or MongoDB URI string to connect to our database
const db = config.get('mongoURI');

// an asynchronous function that will try to connect to the db 
// and if we cannot connect to display an error msg 
const connectDB = async () => {
    try {
        // returns a promise
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');

    } catch (err) {
        console.error(err.message);
        // this will exit the process with failure
        process.exit(1);
    }
}

module.exports = connectDB;
