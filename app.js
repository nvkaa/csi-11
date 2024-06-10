const cors = require('cors');
const cookieParser = require('cookie-parser');
const uid = require('uid-safe')
const express = require('express');
const session = require('express-session');
const axios = require('axios')
const bodyParser = require('body-parser');
const path = require('path');

const {foodItem} = require('./public/js/foodApi/fooditem')

const {randStr} = require('./public/js/modules/helper');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const sess = {
    secret: 'cat',
    cookie: { secure: true, }
}

app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: sess.secret, cookie: { maxAge: 60000 }}))


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
    var userData
    if(req.session.userData){
        userData = req.session.userData// JSON.parse()
        // console.log('userData', userData);
    } else { console.log('app.get render login: no userData');}
    
    res.locals.userData = userData
    res.render('./page/login.ejs', {userData})
})


//signup endpoint
app.post('/save', (req, res) => {
    // console.log(window.location.href);
    console.log('app.post userData', req.body);
    const bd = req.body
    const usn = bd.username;
    const pw = bd.password; 
    if(usn && pw && usn != pw && pw == cfpw){
        const userData = {usn, pw}
        req.session.userData = userData;
        res.redirect('/login');
    } else { res.send("pls fill the form properly")}
});




// redirect endpoint
app.post('/rdr', (req, res) => {
    // console.log(req.body);
    const isSuccessful = req.body.isSuccessful
    const userData = req.session.userData
    console.log(req.session.userData)
    // res.redirect(`/profile?userData=%7B%22usn%22:%22${userData.usn}%22,%22isSuccessful%22:%22${isSuccessful}%22%7D`)
    res.redirect('/profile')
    console.log('redirected to /profile');
})

app.get('/profile', (req, res) => {
    res.render('./page/profile.ejs')
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});