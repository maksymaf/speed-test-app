require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:3000/"] }));
app.use(express.static('public'));

(async function main() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(PORT, () => console.log('Server is listening on http://localhost:3000/'));
    }catch(error){
        console.error(error.stack);
        process.exit(1);
    }
})();
