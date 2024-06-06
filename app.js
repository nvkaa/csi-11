const cors = require('cors');
const cookieParser = require('cookie-parser');
const uid = require('uid-safe')
const express = require('express');
const session = require('express-session');
const axios = require('axios')
const bodyParser = require('body-parser');
const path = require('path');

const {randStr} = require('./public/js/modules/helper')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const sess = {
    secret: 'cat',
    cookie: { secure: true, }
}

app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: sess.secret, cookie: { maxAge: 60000 }}))
// app.use(session({
//     genid: function(req) {
//       return genuuid() // use UUIDs for session IDs
//     },
//     secret: sess.secret
//   }))

// app.use(session({
//     expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
// }));

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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use('/public', express.static('public', { 'Content-Type': 'text/css' }));

app.get('/', (req, res) => {
    res.render('./page/home.ejs');
});

app.get('/account', (req, res) => {
    res.render('./page/signup.ejs'); 
});


//signup endpoint
app.post('/account/signup', (req, res) => {
    // const sid = req.sessionID
    const bd = JSON.parse(req.body.body)
    const usn = bd.usn;
    const pw = bd.pw; 
    const userData = {usn, pw}
    req.session.userData = userData;
    res.redirect('./page/login.ejs');
});


app.get('/account/login', (req, res) => {
    var userData
    if(req.session.userData){
        userData = req.session.userData// JSON.parse()
        // console.log('userData', userData);
    } else { console.log('no userData');}
    
    res.locals.userData = userData
    res.render('./page/login.ejs', {userData})
})

// redirect endpoint
app.post('/rdr', (req, res) => {
    res.redirect('/')
    console.log('redirected to /');
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});