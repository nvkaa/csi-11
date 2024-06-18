// import {foodItem} from '../foodApi/fooditem.js'
import {Trie, TrieNode} from '../modules/trie.js'
import {Menu, MenuItem} from '../modules/binaryTree.js'
import * as displayItems from  '../modules/displayItems.js'


const cookieUsn = document.cookie.split(';').find((row) => row.startsWith(" usn="))?.split("=")[1];
sessionStorage.setItem('username', cookieUsn)
document.cookie = `usn=${cookieUsn};expires=${new Date(Date.now()-1)}`    

const usn = sessionStorage.getItem('username')
const getusn = document.querySelector('#usn')
// console.log(getusn);
getusn.innerHTML=`${usn}`


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

    // console.log('added cart toggle event listener');
    document.getElementById('cart-plus').addEventListener('click', displayItems.cartToggle);
    // document.getElementById('m-cart-plus').addEventListener('click', cartToggle);

    document.querySelectorAll('.increase-item').forEach(item=>{
        item.addEventListener('click', displayItems.incrementItem)
    })

    document.querySelectorAll('.decrease-item').forEach(item=>{
        item.addEventListener('click', displayItems.decrementItem)
    })

    // document.querySelectorAll('.add-to-wish').forEach(item=>{
    //     item.addEventListener('click', displayItems.addToWish)
    // })
    // document.querySelectorAll('#dispWish').forEach(item=>{
    //     item.addEventListener('click',addToWish)
    // })

    document.querySelectorAll('.checkout').forEach(item=>{
        item.addEventListener('click', displayItems.checkout)
    })
}

// document.querySelectorAll('.add-to-cart').forEach( item => console.log(item));






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
homeBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    // axios.post('/home-redirect')
})

const accBtn = document.querySelector('[acc-btn]')
const userInfo = document.querySelector('[user-info]')
// flag = false
accBtn.addEventListener('click', () => {
    userInfo.classList.toggle('hide')
})


const historyRedirect = document.querySelector('[history]')
historyRedirect.addEventListener('click', () => {
    axios.post('/order-history-redirect')
        .then( response => {
            console.log(response.data);
            const queryString = new URLSearchParams();
            queryString.set("data", JSON.stringify(response.data));
            window.location.href = `/order-history?${queryString}`
        })
})


const signoutBtn = document.querySelector('[signout]')
// console.log(signoutBtn);
signoutBtn.addEventListener('click', () => {
    axios.post('/signout')    
    window.location.href = '/login'
})

// alert('linked')