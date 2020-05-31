
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
let uri = 'mongodb://localhost:27017/TruyenTranh';
// ROUTE
// const USER_ROUTE = require('./routes/user');
// const STORY_ROUTE = require('./routes/story');
const HOME_ROUTE = require('./routes/home');
const CATEGORY_ROUTE = require('./routes/category');
const STORY_ROUTE = require('./routes/story');
// MODEL
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views/');
    
app.use('/home',HOME_ROUTE);
app.use('/category',CATEGORY_ROUTE);
app.use('/story',STORY_ROUTE);

app.get('/', (req, res)=> {
    res.json({message: ' connected'})
})

mongoose.connect(uri);
mongoose.connection.once('open',() =>{
    console.log('mongodb connected');
    app.listen(4000,() => console.log('server connected at port 3000'))
})
