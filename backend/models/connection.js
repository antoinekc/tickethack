const mongoose = require('mongoose');

const connectionString = "mongodb+srv://kimkimkimkim0719:784mr4VDEXhb4Kc5@cluster0.ch5wb.mongodb.net/Tickethack?retryWrites=true&w=majority";

module.exports = connectionString; // Do not edit/remove this line

mongoose.connect(connectionString, {connectTimeoutMS: 2000})
.then(() => console.log('Database Connected'))
.catch(error => console.log(error));