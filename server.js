const dotenv = require("dotenv");
const express = require('express')
const app = express()
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 5000


// require connection to database
require('./db/connection');

app.use(express.json())


// register models (databse sets)
require('./models/user')
require('./models/post')


// register router
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("server is running on", PORT)
})

