import { getFirestore, doc, getDoc, collection, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

import {db} from './main.js'



document.addEventListener('DOMContentLoaded', async function () {
    const storedCartCounter = localStorage.getItem('cartCounter');
    let cartCounter = (storedCartCounter &&( (JSON.parse(storedCartCounter)) > 0))
      ? JSON.parse(storedCartCounter)
      : 0;
      document.querySelector('span.cartCounter').textContent = cartCounter;



    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];//always retrieve cart if back


    //add added item to local storage
    function addToCart(ite) {

        cartCounter++;
            localStorage.setItem('cartCounter', JSON.stringify(cartCounter));
  
  
            document.querySelector('span.cartCounter').textContent = cartCounter;
          
  

       
        const image = ite.querySelector('img').src;
        const name = ite.querySelector('.name').textContent
        const price = ite.querySelector('.priceN').textContent
        const id = ite.id ? ite.id : null

        const obj = {
            image: image,
            name: name,
            price: price,
            sku: id


        }
        cart.push(obj)

        localStorage.setItem("cart", JSON.stringify(cart))
    }

    //event listener on all cart items
    document.querySelectorAll('.product-card .add-to-cart').forEach(function (btn) {
        btn.addEventListener('click', function () { addToCart(btn.parentNode) 
            
            



        })
       

    })



function addProduct(product){

const div =document.createElement('div')
div.classList.add('product-card')
div.id=product.sku

const img =document.createElement('img')
img.classList.add('product-image')
img.src=product.src
div.appendChild(img)

const h3=document.createElement('h3')
h3.classList.add('category')
h3.textContent=product.category
div.appendChild(h3)


const name=document.createElement('p')
name.classList.add('name')
name.textContent=product.productName
div.appendChild(name)

const price=document.createElement('p')
price.classList.add('price')
price.textContent='$'

const span=document.createElement('span')
span.classList.add('priceN')
span.textContent=product.price
price.appendChild(span)
div.appendChild(price)

const btn=document.createElement('button')
btn.classList.add('add-to-cart')
btn.textContent='Add To Cart'
btn.addEventListener('click', function () { addToCart(btn.parentNode) })
div.appendChild(btn)

document.querySelector('.product-grid').appendChild(div)

}

const addedProducts= await getDocs(collection(db,'Products'))
    

addedProducts.forEach((produc)=>{

    addProduct(produc.data())

})




})




