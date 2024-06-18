
const accBtn = document.querySelector('[acc-btn]')
const userInfo = document.querySelector('[user-info]')
// flag = false
accBtn.addEventListener('click', () => {
    userInfo.classList.toggle('hide')
})

const signoutBtn = document.querySelector('[signout]')
// console.log(signoutBtn);
signoutBtn.addEventListener('click', () => {
    axios.post('/signout')    
    window.location.href = '/login'
})
// alert('display order')

const data = JSON.parse(document.querySelector('[data]').textContent)
document.querySelector('[data]').remove();

const body = document.querySelector('[display-order]')
