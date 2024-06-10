const data = document.querySelector('[display-user-data]')
const usn = data.children[0].innerHTML
const pw = data.children[1].innerHTML
data.remove()
console.log(usn, pw);

async function postCheck(body) {
    console.log(body);
    try {
        const response = await axios.post('/rdr', { body });
        console.log(response.data);
        window.location.href = '/';
    } catch (error) {
        console.error('error post', error);
    }
}

const checkBtn = document.querySelector('#getData')
checkBtn.addEventListener('click', () => {
    const checkUsn = document.querySelector('#l-username').value
    const checkPw = document.querySelector('#l-password').value
    console.log(checkUsn, checkPw);

    if (checkUsn == usn && checkPw == pw) {
        postCheck({ isSuccessful: true })
    } else { console.log('failed postCheck'); }
})