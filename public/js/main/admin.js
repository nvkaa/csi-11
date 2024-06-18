import * as displayItems from  '../modules/displayItemsAdmin.js'

const fetchFoodItem = await axios.get('/food-item')
const foodItem = fetchFoodItem.data
// console.log('script.js foodItem', foodItem);


displayItems.displayItems(foodItem)
displayItems.selectTaste(foodItem)

window.onresize= window.onload= function(){
    var size= window.screen.width;
    if(size<800){
        var cloneFoodItems= document.getElementById('food-items').cloneNode(true);
        var cloneCartPage= document.getElementById('cart-page').cloneNode(true);
        document.getElementById('food-items').remove();
        document.getElementById('cart-page').remove();
        document.getElementById('category-header').after(cloneFoodItems);
        document.getElementById('food-items').after(cloneCartPage);
        addEvents()
    }
    if(size>800){
        // var cloneFoodItems= document.getElementById('food-items').cloneNode(true);
        // document.getElementById('food-items').remove();
        // document.getElementById('header').after(cloneFoodItems);

        // var cloneCartPage= document.getElementById('cart-page').cloneNode(true);
        // document.getElementById('cart-page').remove();
        // document.getElementById('food-items').after(cloneCartPage);
        addEvents()
    }
}

function addEvents(){
    // console.log('called addEvents');
    document.querySelectorAll('.add-to-cart').forEach( item => {
        item.addEventListener('click', () => {
            // console.log('added eventListener click');
            displayItems.addToCart(foodItem, item);
        })
    });

    document.querySelectorAll('.increase-item').forEach(item=>{
        item.addEventListener('click', displayItems.incrementItem)
    })

    document.querySelectorAll('.decrease-item').forEach(item=>{
        item.addEventListener('click', displayItems.decrementItem)
    })

    document.querySelectorAll('.add-to-wish').forEach(item=>{
        item.addEventListener('click', displayItems.addToWish)
    })
    // document.querySelectorAll('#dispWish').forEach(item=>{
    //     item.addEventListener('click',addToWish)
    // })

    document.querySelectorAll('.checkout').forEach(item=>{
        item.addEventListener('click', displayItems.checkout)
    })
}

const homeBtn = document.querySelector('[home]')
homeBtn.addEventListener('click', (e) => {
    window.scrollTo({top: 0, behavior: 'smooth'})
})

const accBtn = document.querySelector('[acc-btn]')
const userInfo = document.querySelector('[user-info]')
// flag = false
accBtn.addEventListener('click', () => {
    userInfo.classList.toggle('hide')
})


const signoutBtn = document.querySelector('[signout]')
signoutBtn.addEventListener('click', () => {
    axios.post('/signout')    
    window.location.href = '/login'
})