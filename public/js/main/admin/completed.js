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

// alert('complete')

const body = document.querySelector('[display-order]')
document.addEventListener('DOMContentLoaded', async () => {
    await axios.post("/complete-redirect")
    .then( response => {
        const data = response.data.filter( item => item.state == 'completed')
        let totalQuantity = 0
        let totalPrices = []

        data.map( item=> {
            const row = document.createElement('tr');
        
            const col1 = document.createElement('td')
            col1.innerText = item.order_id
            
            const col2 = document.createElement('td');
            const col3 = document.createElement('td');
            const col4 = document.createElement('td');
            let totalPrice = 0
            item.dishes.forEach( dish => {
                col2.innerHTML += `${dish.name} <br>`
                col3.innerHTML += `${dish.quantity} <br>`
                col4.innerHTML += `${dish.price} <br>`
                totalPrice += dish.price   
                totalQuantity += dish.quantity
            })
            totalPrices.push(totalPrice) 

            const col5 = document.createElement('td');
            col5.innerText = item.state
            
        
            const col6 = document.createElement('td');
            col6.innerText = totalPrice

            const nodesToAdd = [col1, col2, col3, col4, col5, col6]
            nodesToAdd.forEach( node => row.appendChild(node) )
        
            body.appendChild(row);
        })
        
        const totalRow = document.createElement('tr')

        const col1 = document.createElement('td')
        col1.style.border = 'none'

        const col2 = document.createElement('td');
        col2.innerText = `Total: `

        const col3 = document.createElement('td');
        col3.innerText = totalQuantity

        const col4 = document.createElement('td'); 
        col4.style.border = 'none'

        const col5 = document.createElement('td');
        col5.style.border = 'none'

        const col6 = document.createElement('td');
        let income = 0
        totalPrices.forEach( num => {
            income+=num
        })
        col6.innerText = income

        const nodesToAdd = [col1, col2, col3, col4, col5, col6]
        nodesToAdd.forEach( node => totalRow.appendChild(node) )

        body.appendChild(totalRow);
    })

    
})