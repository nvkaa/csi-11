// const data = document.querySelector('[display-user-data]')
// const usn = data.children[0].innerHTML
// const pw = data.children[1].innerHTML
// data.remove()
// console.log(usn, pw);

// async function postCheck(body) { 
//     console.log(body);
//     try {
//         const response = await axios.post('/redirect', { body });
//         console.log(response.data);
//         window.location.href = '/';
//     } catch (error) {
//         console.error('error post', error);
//     }
// }

const checkBtn = document.querySelector('#getData')
checkBtn.addEventListener('click', () => {
    const checkUsn = document.querySelector('#l-username').value
    const checkPw = document.querySelector('#l-password').value
    // console.log(checkUsn, checkPw);
    axios.post('/check-login', {checkUsn, checkPw})
        .then(response => {
            // console.log(response);
            if(response.data == 'incorrect username or password'){
                alert(response.data);
            } else if(response.data == "/admin") { window.location.href = '/admin' }
            else { window.location.href = '/home'}
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
})

