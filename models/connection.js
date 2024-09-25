const mongoose = require('mongoose');


const CONNECTION_STRING = process.env.CONNECTION_STRING;

// const connectionString = `mongodb+srv://kimkimkimkim0719:${MONGO_API_KEY}@cluster0.ch5wb.mongodb.net/Tickethack?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, {connectTimeoutMS: 2000})
.then(() => console.log('Database Connected'))
.catch(error => console.log(error));

