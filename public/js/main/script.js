// import {foodItem} from '../foodApi/fooditem.js'
import {Trie, TrieNode} from '../modules/trie.js'
import {Menu, MenuItem} from '../modules/binaryTree.js'
import * as displayItems from  '../modules/displayItems.js'

const fetchFoodItem = await axios.get('/food-item')
const foodItem = fetchFoodItem.data
// console.log('script.js foodItem', foodItem);


displayItems.displayItems(foodItem)
displayItems.selectTaste(foodItem)



document.querySelectorAll('.add-to-cart').forEach(item=>{
    item.addEventListener('click', displayItems.addToCart)
})



document.getElementById('cart-plus').addEventListener('click',cartToggle);
document.getElementById('m-cart-plus').addEventListener('click',cartToggle);

document.getElementById('dispWish').addEventListener('click', wishToggle);


var display = false;
function cartToggle(){
    if(cartData.length > 0){
        document.getElementById('food-items').classList.toggle('food-items');
        document.getElementById('category-list').classList.toggle('food-items');
        document.getElementById('category-header').classList.toggle('toggle-category');
        document.getElementById('m-cart-plus').classList.toggle('m-cart-toggle')
        document.getElementById('cart-page').classList.toggle('cart-toggle');
        document.getElementById('checkout').classList.toggle('cart-toggle');

        // document.getElementById('food-items').display='none'
        // document.getElementById('category-list').classList.toggle('food-items');
        // document.getElementById('category-header').classList.toggle('toggle-category');
        // document.getElementById('m-cart-plus').classList.toggle('m-cart-toggle')
        // document.getElementById('cart-page').classList.toggle('cart-toggle');
        // document.getElementById('checkout').classList.toggle('cart-toggle');

        display = !display;
        console.log(display)
    }
    else{
        alert("Currently no item in cart!");
    }
    console.log(display);
}

// console.log(wishData);
function wishToggle(){
    // if(display == false){
        document.getElementById('food-items').classList.toggle('food-items');
        document.getElementById('category-list').classList.toggle('food-items');
        document.getElementById('category-header').classList.toggle('toggle-category');
        // document.getElementById('m-cart-plus').classList.toggle('m-cart-toggle')
        document.getElementById('wish-page').classList.toggle('wish-toggle');
        document.getElementById('checkout').classList.toggle('wish-toggle');
        display = !display;
        console.log(display)
    // }
    // else{
    //     document.getElementById('m-cart-plus').classList.toggle('m-cart-toggle')
    //     document.getElementById('cart-page').classList.toggle('cart-toggle');
    //     document.getElementById('wish-page').classList.toggle('wish-toggle');
    //     document.getElementById('checkout').classList.toggle('cart-toggle');
    // }
    
}

const logo = document.getElementById('home-rdr')
logo.addEventListener('click', (e) => {
    e.preventDefault

})



window.onresize= window.onload= function(){
    var size= window.screen.width;
    // console.log(size)
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
        var cloneFoodItems= document.getElementById('food-items').cloneNode(true);
        document.getElementById('food-items').remove();
        document.getElementById('header').after(cloneFoodItems);

        var cloneCartPage= document.getElementById('cart-page').cloneNode(true);
        document.getElementById('cart-page').remove();
        document.getElementById('food-items').after(cloneCartPage);
        addEvents()
    }
}

function addEvents(){
    document.querySelectorAll('.add-to-cart').forEach(item=>{
        item.addEventListener('click', displayItems.addToCart)
    });
    document.querySelectorAll('.increase-item').forEach(item=>{
        item.addEventListener('click', incrementItem)
    })

    document.querySelectorAll('.decrease-item').forEach(item=>{
        item.addEventListener('click', decrementItem)
    })

    document.querySelectorAll('.add-to-wish').forEach(item=>{
        item.addEventListener('click', displayItems.addToWish)
    })
    // document.querySelectorAll('#dispWish').forEach(item=>{
    //     item.addEventListener('click',addToWish)
    // })

    document.querySelectorAll('.checkout').forEach(item=>{
        item.addEventListener('click',checkout)
    })
}


document.getElementById('add-address').addEventListener('click',addAddress);

document.getElementById('m-add-address').addEventListener('click',addAddress);



function addAddress(){
    var address= prompt('Enter your address');
    
    console.log(window.address);
    if(address){
        document.getElementById('add-address').innerText= ' ' + address;
        // localStorage.setItem('address', JSON.parse(address))
    }
    else{
        alert("Address not added")
    }
}

// document.getElementById("order-rdr").addEventListener("click", () => {
//     window.location='./order.html'
// })

// document.getElementById("cart-plus").addEventListener("click", () => {
//     window.location='./order.html'
// })





const trie = new Trie();
const menu = new Menu();

foodItem.forEach(item => trie.insert(item.name.toUpperCase()))
foodItem.forEach(item => menu.insert(item.name.toUpperCase(), item.price))

// menu.logMenu()
// trie.printAllNodes()

const searchResult = document.querySelector('[data-search-result]')
for(let i = 0; i<foodItem.length; i++){
    const srs = document.createElement('a')
    srs.href='#'
    srs.classList.add('srs')
    srs.classList.add('hide')

    searchResult.appendChild(srs)
}



const search = document.querySelector('[search]')
search.addEventListener('input', (e) => {
    let searchInput = e.target.value.toUpperCase();
    // console.log(searchInput);
    // console.log(menu.search(searchInput));
    // console.log(trie.search(searchInput));
    const itemCard = document.querySelectorAll('#item-card')
    
    if(searchInput === ''){ itemCard.forEach(card => card.classList.remove('hide')) }
    
    if(trie.search(searchInput)){
        let i = 0
        for(let j = 0; j<searchResult.children.length; j++){
            if(i >= trie.search(searchInput).length){ searchResult.children[j].classList.add('hide') }
            else {
                searchResult.children[j].classList.remove('hide')
                searchResult.children[j].innerHTML = trie.search(searchInput)[i]
                searchResult.children[j].addEventListener('click', (e) => search.value = e.target.innerHTML)
                i++
            }
        }
    } else { searchResult.children.forEach( tag => tag.classList.remove('hide')) }

    

})

search.addEventListener('keydown', (e) => {
    const itemCard = document.querySelectorAll('#item-card')

    if (e.key === 'Enter' || e.keyCode === 13) {
        const searchInput = search.value
        itemCard.forEach( card => {
            if(menu.search(searchInput)){
                if(card.children[2].textContent.toUpperCase()!==searchInput){ card.classList.add('hide') }
            } else { card.classList.remove('hide') }
        })
    }
});


const searchContainer = document.querySelector('[search-container]')
searchContainer.addEventListener('focusin', (e) => {
    searchResult.classList.remove('hide')
})

searchContainer.addEventListener('focusout', (e) => {
    // searchResult.classList.add('hide')
    if (!searchContainer.contains(e.relatedTarget)) {
        searchResult.classList.add('hide');
    }
})

const homeBtn = document.querySelector('[home]')
homeBtn.addEventListener('click', (e) => {
    window.scrollTo({top: 0, behavior: 'smooth'})
})
