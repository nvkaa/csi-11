const accBtn = document.querySelector('[acc-btn]')
const userInfo = document.querySelector('[user-info]')
// flag = false
accBtn.addEventListener('click', () => {
    userInfo.classList.toggle('hide')
})