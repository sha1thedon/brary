if (process.env.NODE_ENV !== 'production'){
    require('dotenv').load()
}
const express = require ('express') //call express file
const app = express()
const expressLayouts = require('express-ejs-layouts') //call layouts package
const indexRouter = require('./routes/index')
const env = require('dotenv').config()

app.set('view engine', 'ejs')
//set where views are coming from
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public')) //tell where public files will be
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser : true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to mongoose'))
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)