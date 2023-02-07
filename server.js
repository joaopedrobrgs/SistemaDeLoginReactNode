const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const cors = require('cors');

app.use(cors());
app.use('/user', userRoute);
app.use('/', authRoute);

app.listen(process.env.PORT, ((error)=>{
    if(!error){
        console.log('-Server running on port 3000');
    }
}))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_URL, (error, db) => {
    if (!error) {
        console.log('-Database loaded');
    }
});
const db = mongoose.connection;
db.watch().on('change', data => console.log('-Database has been updated'));



