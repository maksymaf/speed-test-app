require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:3000/"] }));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
    })
}));
app.use(express.static('public'));
app.use('/api/auth', require('./routes/authRoute'));

(async function main() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(PORT, () => console.log('Server is listening on http://localhost:3000/'));
    }catch(error){
        console.error(error.stack);
        process.exit(1);
    }
})();
