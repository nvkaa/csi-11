async function postSignup(body) {
    // console.log(body);
    
}



const saveData = document.getElementById('saveData');
saveData.addEventListener('click', async () => {  
    const usn = document.getElementById('username').value;
    const pw = document.getElementById('password').value;
    const cfpw = document.getElementById('cf_password').value;
    console.log(usn, pw, cfpw);
    try {
      const response = await axios.post('/save-register', {
        username: usn,
        password: pw,
        cf_password: cfpw
      });
      // console.log(response.data); 
      if(response.data == 'account created successfully'){
        alert(response.data)
        window.location.href = '/login';
      } else {
        alert(response.data)
      }
    } catch (error) {
      console.error('error post', error);
    }
});