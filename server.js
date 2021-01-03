// Dependencies
const express = require("express");
const connectDB = require('./config/db');

const app = express();
//if there is no environmental port, than run port 5000 locally
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();


// ** ROUTES **
// sends data to the browser, 
// and when hitting /, i.e http://localhost:5000, it will display the below msg
app.get('/', (req,res) => res.send('API Running'));



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
