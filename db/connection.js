const mongoose = require('mongoose');
const MONGOURI = process.env.MONGOURI

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

})

mongoose.connection.on('connected', () => {
    console.log("connection successfull")
})

mongoose.connection.on('error', (err) => {
    console.log("error in  connection", err)
})