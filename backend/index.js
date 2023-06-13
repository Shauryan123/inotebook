const connectToMongo = require('./db.js');
const express = require('express');
const app = express();
const cors = require('cors');
connectToMongo();
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://shauryan123.github.io');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
app.use(cors());
const port = 5000;
app.use(express.json());
app.use("/api/auth", require('./routes/auth.js'));
app.use("/api/notes", require('./routes/notes.js'));

app.listen(port, () => {
    console.log(`Example app listening on port https://localhost:${port}`)
})