const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');



const app = express();


// BodyParser Middleware
app.use(express.json());


// db Config
const db = config.get('mongoURI');

// connect to mongodb
mongoose
	.connect(db, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Mo ti wa online...'))
	.catch((err) => console.log(err));


// Use routes/api/
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));


//Serve static files if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));