const express = require('express');
const session = require('express-session');
const axios = require('axios')
const bodyParser = require('body-parser');
const path = require('path');

const {foodItem} = require('./public/js/foodApi/fooditem')

const {randStr} = require('./public/js/modules/helper');
const db = require('./db/dbCfg')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.set('trust proxy', 1) // trust first proxy
app.use(session({ 
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 60000}
}))


app.get('/test', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
})



const port = 3000;
// var isSuccessful = false

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use('/public', express.static('public', { 'Content-Type': 'text/css' }));

app.get('/food-item', (req, res) => res.send(foodItem))

app.get('/', (req, res) => {
    res.render('./page/home.ejs', {foodItem});
});

app.get('/signup', (req, res) => {
    res.render('./page/signup.ejs'); 
});

app.get('/login', (req, res) => {
    res.render('./page/login.ejs')
})

app.post("/login-redirect", (req, res) => {
    res.redirect('/login')
})


//signup endpoint
app.post('/save-register', async (req, res) => {
    const { username, password, cf_password} = req.body
    if(username && password && username != password && password == cf_password){
        const userData = {username, password}
        // const data = db.getData(`select * from account where usn = "${username}" and pw = "${password}"`)
        const data = await db.getData(`select * from account where usn = "${username}" and pw = "${password}"`);
        if (data.length === 0) {
            db.insertData(`insert into account (usn, pw) values ("${username}","${password}")`)
            // req.session.userData = userData;
            res.redirect('/login');
        } else {
            res.send("username is already used");

        }
    } else { res.send("pls fill the form properly")}
});

app.post('/check-login', async (req,res) => {
    const {username, password} = req.body
    console.log(username, password);
    const allAccounts = await db.getData(`select * from account`);
    console.log(allAccounts);

    const data = await db.getData(`select * from account where usn = "${username}" and pw = "${password}"`);
    console.log(data)

    if (data.length === 0 || password != data[0].pw) {
        // res.send("res.send: username or password incorrect");
        // res.send("Login Unccesfully!")
        console.log("Can't loggin")
        // res.redirect('/login');
    } else {
        console.log("login succesful");
        res.redirect("/")
    }
})

app.get('/profile', (req, res) => {
    res.render('./page/profile.ejs')
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});