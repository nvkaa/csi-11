const accBtn = document.querySelector('[acc-btn]')
const userInfo = document.querySelector('[user-info]')
console.log(accBtn, userInfo);
// flag = false
accBtn.addEventListener('click', () => {
    userInfo.classList.toggle('hide')
})


const signoutBtn = document.querySelector('[signout]')
signoutBtn.addEventListener('click', () => {
    // axios.post('/signout')    
    window.location.href = '/login'
})



const foodContainer = document.querySelector('#food-container')
foodContainer.style.margin = "0px"

const body = document.querySelector('[display-order]')
document.addEventListener('DOMContentLoaded', async () => {
    await axios.post("/orders-redirect")
    .then( response => {
        const data = response.data.filter( item => item.state !== 'completed')

        data.map( item=> {
            const row = document.createElement('tr');
        
            const col1 = document.createElement('td')
            col1.innerText = item.order_id
            
            const col2 = document.createElement('td');
            const col3 = document.createElement('td');
            const col4 = document.createElement('td');
            
            item.dishes.forEach( dish => {
                col2.innerHTML += `${dish.name} <br>`
                col3.innerHTML += `${dish.quantity} <br>`
                col4.innerHTML += `${dish.price} <br>`
            })
        
            const col5 = document.createElement('td');
            col5.innerText = item.state
        
            const col6 = document.createElement('td');
            const btn = document.createElement('button');
            btn.innerText = "Change state"
            btn.setAttribute('class', 'cancel-btn')
            btn.addEventListener('click', async (e) => {
                const oid = e.target.parentElement.parentElement.children[0].innerText
                // const prices = target.parentElement.parentElement.children[3].innerText
                const state = e.target.parentElement.parentElement.children[4].innerText
                await axios.post('/next-state', 
                    { oid: oid, state: state }
                ) .then ( 
                    location.reload()
                )
            })
            col6.appendChild(btn)
            
            const nodesToAdd = [col1, col2, col3, col4, col5, col6]
            nodesToAdd.forEach( node => row.appendChild(node) )
        
            body.appendChild(row);
        })
    })

    
})