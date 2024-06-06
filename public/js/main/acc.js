
const signupForm = document.getElementById('login-box');
signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
  
    const usn = document.getElementById('username').value;
    const pw = document.getElementById('password').value;
    const cfpw = document.getElementById('cf_password').value;
    var body 
    if(usn && pw && usn != pw && pw == cfpw){
        body = JSON.stringify({usn, pw})
        // console.log(body);
    } else { alert('pls fill the form properly') }


    axios.post('/account/signup', {body})
    .then( resp => { 
        resp
    } )
});

// const rdr = document.querySelector('[signinrdr]')
// rdr.addEventListener('click', e => {

//     axios.post('/rdr', JSON.stringify('data'))
//     .then( resp => {console.log(resp);} )

// })