import { getFirestore, doc, getDoc, collection, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from './main.js'

// await setDoc(doc(db, "Names", customID), {



function addItemList(name, price) {

    const div = document.createElement('div')
    div.classList.add('your-order-item')

    const h3 = document.createElement('h3')
    h3.textContent = name
    div.appendChild(h3)

    const span = document.createElement('span')
    span.textContent = '$' + price
    div.appendChild(span)

    const hr = document.createElement('hr')
    div.appendChild(hr)

    document.querySelector('.your-order-items').appendChild(div);
}




document.addEventListener('DOMContentLoaded', async () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const total = JSON.parse(localStorage.getItem('total'))
    const user= JSON.parse(localStorage.getItem('user'))
    const SKUS = []
    document.querySelector('.checkoutTotal').textContent = '$' + localStorage.getItem('total')
    const billingForm = document.querySelector('#billing-form')
    const paymentForm = document.querySelector('#payment-form')







    for (let item of cart) {
        addItemList(item.name, item.price)
        SKUS.push(item.sku)

    }



    billingForm.addEventListener('submit', (e) => { e.preventDefault() })

    



    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        let billingFormData = new FormData(billingForm)
        const formDataObject = {};
        billingFormData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        

        try{
            await setDoc(doc( collection(db, 'Orders')), {
                FirstName: formDataObject.FirstName,
                LastName: formDataObject.LastName,
                City: formDataObject.City,
                Address: formDataObject.Address,
                Phone: formDataObject.Phone,
                Total: total,
                Products: SKUS,
                Email: formDataObject.Email,
                UID:user.uid ,
                PaymentMethod:document.querySelector('input[type=radio]:checked').value
    
    
    
            })
    
        }


        catch (error) {
            console.error("Error saving order:", error);
            alert("Failed to place the order. Please try again.");
        }

        alert('Order Submitted!!!')
        localStorage.removeItem('cart')
        localStorage.setItem('total','0')
        localStorage.setItem('cartCounter','0')
        window.location.reload()
       

        
    })






})