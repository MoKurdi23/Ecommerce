import { getFirestore, doc, getDoc, collection, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './main.js'








document.addEventListener('DOMContentLoaded', async function () {
  const storedCartCounter = localStorage.getItem('cartCounter');
  let cartCounter = (storedCartCounter &&( (JSON.parse(storedCartCounter)) > 0))
    ? JSON.parse(storedCartCounter)
    : 0;
    document.querySelector('span.cartCounter').textContent = cartCounter;





  let total = document.querySelector('.totalN')
  let totalC = 0

  const cart = JSON.parse(localStorage.getItem("cart"))



  //loop through cart array sent from main dashboard in local storage and add each item to cart
  for (let item of cart) {

    let itemCart = document.createElement('div');
    itemCart.classList.add('cart-item');
    itemCart.id = item.sku
    console.log(itemCart.id)

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-circle-xmark', 'fa-regular')




    itemCart.appendChild(deleteIcon)

    let img = document.createElement('img')
    img.classList.add('cart-img')
    img.src = item.image
    itemCart.appendChild(img)

    let name = document.createElement('p')
    name.classList.add('cart-name')
    name.textContent = item.name
    itemCart.appendChild(name)


    let price = document.createElement('h3')
    price.classList.add('cart-price')
    price.textContent = '$'

    let priceN = document.createElement('span')
    priceN.classList.add('cart-price-number')
    priceN.textContent = item.price
    price.appendChild(priceN)


    itemCart.appendChild(price)




    document.querySelector('.cart-items').appendChild(itemCart)
    document.querySelector('.cart-items').appendChild(document.createElement('hr'))



    //update total
    totalC = totalC + (parseInt(item.price) ? parseInt(item.price) : 0)
    
    total.textContent = totalC
    


  }
  localStorage.setItem('total',JSON.stringify(totalC))



  //   const products=collection(db,'Products')
  const product = await getDoc(doc(db, 'Products', 'M124'))
  console.log(product.data().category)


  document.querySelectorAll('.fa-circle-xmark').forEach(

    (btn) => {
      btn.addEventListener('click', () => {

       
          cartCounter--;
          localStorage.setItem('cartCounter', JSON.stringify(cartCounter));


          document.querySelector('span.cartCounter').textContent = cartCounter;
        



        const id = btn.parentNode.id
        const parent = btn.parentNode
        for (let [index, val] of cart.entries()) {
          if (val.sku === id) {
            let upd = totalC - parseInt(parent.querySelector('span.cart-price-number').textContent)

            document.querySelector('.totalN').textContent = upd
            totalC = upd
            cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cart))
            localStorage.setItem('total',JSON.stringify(totalC))

            parent.nextSibling.remove();
            parent.remove()
            break;
          }
        }
      }
      )
    }
  )



 
})







