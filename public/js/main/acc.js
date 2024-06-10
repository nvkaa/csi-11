// async function postSignup(body) {
//     // console.log(body);
//     try {
//       const response = await axios.post('/account/signup', {body});
//       console.log(response.data); 
//       // window.location.href = '/account/login';
//     } catch (error) {
//       console.error('error post', error);
//     }
// }



// const saveData = document.getElementById('saveData');
// saveData.addEventListener('click', (event) => {  
//     const usn = document.getElementById('username').value;
//     const pw = document.getElementById('password').value;
//     const cfpw = document.getElementById('cf_password').value;
//     var body 
//     if(usn && pw && usn != pw && pw == cfpw){
//         body = JSON.stringify({usn, pw})
//         // console.log(body);
//     } else { alert('pls fill the form properly') }
//     // postSignup(body)
// });