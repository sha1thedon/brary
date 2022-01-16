if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require ('express') //call express file
//const partials = require('express-partials');
const app = express()
const expressLayouts = require('express-ejs-layouts') //call layouts package
//const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const methodOverride = require('method-override')
const bookRouter = require('./routes/books')
//const env = require('dotenv').config()
//const author = require("ejs");
//const book = require("ejs");
//app.engine('html', EJS.renderFile);
app.set('view engine', 'ejs')
//set where views are coming from
app.set('views', __dirname + '/view')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public')) //tell where public files will be
app.use(express.urlencoded({limit: '10mb', extended: false}))
//app.use(partials());



const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to mongoose'))
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


app.listen(process.env.PORT || 3000)