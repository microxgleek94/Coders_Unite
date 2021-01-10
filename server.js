const express = require('express');
const connectDB = require('./config/db');

const app = express();

//if there is no environmental port, than run port 5000 locally
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();

// Init Middleware
// allows us to get data from req.body
app.use(express.json({ extended: false }));

// sends data to the browser,
// and when hitting /, i.e http://localhost:5000, it will display the below msg
app.get('/', (req, res) => res.send('API Running'));

// API Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
