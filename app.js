const express = require('express');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);    
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

// const mongoUri = 'mongodb+srv://nvka:nvkaasb1@session-management.mpyccyt.mongodb.net/';
app.use(session({ 
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000},
    // store: MongoStore.create({
    //     mongoUrl,
    //     collection: 'session' 
    // })
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
    console.log(req.body);
    const { username, password, cf_password } = req.body

    if((username) && (password) && (username != password) && (password == cf_password)){
        const data = await db.getData(`select * from account where username = "${username}"`);
        if (data.length === 0) {
            db.insertData(`insert into account (username, password) values (?,?)`, [username, password])
            res.send('account created successfully');
        } else {
            res.send("username is already used");

        }
    } else { res.send("pls fill the form properly")}
});

app.post('/check-login', async (req,res) => {
    const sessionId = req.session.id
    const {checkUsn, checkPw} = req.body
    

    const data = await db.getData(`select * from account where username = "${checkUsn}" and password = "${checkPw}"`);
    
    if(checkUsn == "adm" && checkPw == "11"){
        req.session.admin = {sid: sessionId, user: 'admin'}
        res.cookie('sid', sessionId, { httpOnly: true });
        // res.cookie('usn', checkUsn);
        res.send('/admin')
    } else {
        if (data.length === 0 || checkPw != data[0].password) {
            res.send('incorrect username or password');
        } else {
            console.log("login succesful");
            req.session.user = {uid: data[0].user_id, sid: sessionId, user: checkUsn}
            res.cookie('sid', sessionId, { httpOnly: true });
            res.cookie('usn', checkUsn);
            res.redirect("/home")
        }
    }

    
})

const checkAdminSession = (req, res, next) => {
    if (!req.session.admin) {

        return res.redirect('/login');
      }
      next();
}

app.get('/admin', checkAdminSession, (req, res) => {
    res.render('./page/admin/menu.ejs')
})

const checkSession = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    next();
};

app.get('/home', checkSession, (req, res) => {
    res.render('./page/home.ejs');
});





//get order data

//for admin:
app.post('/orders-redirect', async (req, res) => {
    // console.log('redirecting to admin order page');
    // const usn = req.session.user.user
    const data = await db.getData(`select * from orders where state != "completed"`);
    res.send(data)
    // res.redirect('/orders')
})

app.get('/orders', checkAdminSession, (req, res) => {
    res.render('./page/admin/orders.ejs')
})


//for client:
app.post("/order-history-redirect", async (req, res) => {
    // console.log('redirecting to user order history');
    const usn = req.session.user.user
    const data = await db.getData(`select * from orders where username = "${usn}"`);
    res.send(data)
})

app.get('/order-history', checkSession, (req, res) => {
    // const usn = req.session.user.user

    // const data = await db.getData(`select * from orders where username = "${usn}"`);
    res.render('./page/order_history.ejs')
})



// cancel order 
app.post('/cancel-order', (req, res) => {
    console.log(req.body);

    db.deleteData(`delete from orders where order_id = ?`, [req.body.oid])
})



app.post('/next-state', (req, res) => {
    
})



// app.get('/profile', (req, res) => {
//     res.render('./page/profile.ejs')
// })




app.post('/checkout', (req,res) => {
    // console.log(req);
    // console.log(req.session.user.user);
    if(req.body.length > 0){
        const usn = req.session.user.user
        // console.log(typeof usn);
        db.updateData(`UPDATE account SET state = "pending" WHERE username = "${usn}"`)
        
        
        // console.log(req.body);
        const order = req.body.map( item => {
            return {name: item.name, quantity: item.quantity, price: item.price}
        })
        // console.log(order);
        const date = new Date()
        db.insertData(`INSERT INTO orders (state, username, dishes, created_at, updated_at) VALUES (?,?,?,?,?)`, ['pending', usn, JSON.stringify(order), date.toISOString().slice(0,10), date.toISOString().slice(0,19).replace("T", " ")])
        res.send("Order sent, please check your history for order state")
    } else {
        res.send("Your cart is empty, please order something before checking out")
    }
    
})

app.post('/signout', (req, res) => {
    // const sid = req.headers.cookie.split(';').find((row) => row.startsWith(" sid="))?.split("=")[1];
    // console.log('/signout', req.session[`${sid}`]);
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.state(500).send('Error logging out');
        }
        res.redirect('/login');
    });

    // req.sessionStore.sessionModel.findAll()
    // .then(sessions => sessions.map(sess => JSON.parse(sess.dataValues.data)))
    // .then((sessions) => {
    //   console.log(sessions)
    // })
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});