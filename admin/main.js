
import { getFirestore, doc, getDoc, collection, getDocs, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {showDetails} from './Portal.js'


const firebaseConfig = {
  apiKey: "AIzaSyAvhcMK0PrHjBoRRWuXp7_fLcIdmgmw_Z4",
  authDomain: "durdtech.firebaseapp.com",
  projectId: "durdtech",
  storageBucket: "durdtech.firebasestorage.app",
  messagingSenderId: "3475160455",
  appId: "1:3475160455:web:54de4a586c4841be746722",
  measurementId: "G-QCMDGKWBSY"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);// get actual databse



export function addUserToDOM(email, password) {
  const newUser = document.createElement("li");
  newUser.classList.add("user-list-item", "user");

  const emailSpan = document.createElement("span");
  emailSpan.textContent = email;

  const passwordSpan = document.createElement("span");
  passwordSpan.textContent = password;

  newUser.appendChild(emailSpan);
  newUser.appendChild(passwordSpan);
  document.querySelector("ul.user-list").appendChild(newUser);
}





export async function fetchUsers() {
  const users = [];
  try {
    const namesCollectionRef = collection(db, "Names"); 
    const querySnapshot = await getDocs(namesCollectionRef);
    querySnapshot.forEach((doc) => {
      const nameData = doc.data();
      users.push({
        email: nameData.email,
        password: nameData.pass,
      });
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return users;
}





document.addEventListener('DOMContentLoaded', async function () {
  

const form = document.querySelector('#addProductForm')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      const btn = document.querySelector('#submitProductBtn');
      const formData = new FormData(form, btn);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      //database    collection     doc id
      await setDoc(doc(db, 'Products', formDataObject.sku),
        {
          sku: formDataObject.sku,
          src: formDataObject.imageUpload,
          price: formDataObject.price,
          category: formDataObject.category,
          productName: formDataObject.productName,


        }

      );
    
    }

    catch (e) {
      console.error("Error writing document: ", e);
      
    }


  })



  const products = collection(db, 'Products')
  const docs = await getDocs(products)


  docs.forEach((doc) => {
    const product = doc.data()
    const listItem = document.createElement('li')
    listItem.classList.add('product-list-item')

    const name = document.createElement('span')
    name.textContent = product.productName
    listItem.appendChild(name)

    const div = document.createElement('div')



    const sku = document.createElement('span')
    sku.textContent = product.sku
    sku.classList.add('sku')
    div.appendChild(sku)


    const category = document.createElement('span')
    category.textContent = product.category
    div.appendChild(category)
    const price = document.createElement('span')
    price.textContent = '$ ' + product.price
    div.appendChild(price)


    const trash = document.createElement('i')
    trash.classList.add('fa-trash', 'fa-solid')
    trash.id = product.sku
    div.appendChild(trash)



    listItem.appendChild(div)
    document.querySelector('ul.product-list').appendChild(listItem)



  })


  document.querySelectorAll('.fa-trash').forEach(function (trash) {

    trash.addEventListener('click', async (e) => {

      e.target.parentNode.parentNode.remove()
      await deleteDoc(doc(db, "Products", trash.id));

    })


  })

const Orders=await getDocs(collection(db,'Orders'))
Orders.forEach((order)=>{
  createOrderListItem(order.data().Email,order.id)
  createOrderDetailsDiv(order.data(),order.id)



})




})

function createOrderListItem(email, orderID) {
  const orderListItem = document.createElement("li");
  orderListItem.classList.add("order-list-item", orderID,'order1'); // Use doc ID for class
  orderListItem.innerHTML = `
      <span>Order</span>
      <div>
          <span>${email}</span>
          <span><input type="checkbox"></span>
      </div>
  `;

  // Add event listener to show order details when clicked
  orderListItem.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') { // Ignore clicks on the checkbox
          showDetails(document.querySelector(`#${orderID}`)); // Show details of the order
      }
  });

  // Append the order list item to the orders container
  document.querySelector('ul.order-list').appendChild(orderListItem);
}



// Function to create and add the order details div
function createOrderDetailsDiv(orderData, orderID) {
  const orderDetailsDiv = document.createElement('div');
  orderDetailsDiv.id = orderID; // Set ID to the document ID for easy access
  orderDetailsDiv.classList.add('hidden', 'details', 'order'); // Initially hidden

  // Populate the order details div with data from the document
  orderDetailsDiv.innerHTML = `
      <h3 class="order-id">Order ID: <span>${orderID}</span></h3>
      <h3 class="order-total">Total: <span>${orderData.Total}</span></h3>
      <h3 class="order-name">User: <span>${orderData.FirstName} ${orderData.LastName}</span></h3>
      <h3 class="order-email">Email: <span>${orderData.Email}</span></h3>
      <h3 class="order-address">Address: <span>${orderData.City} ${orderData.Address}</span></h3>
      <h3 class="order-phone">Phone: <span>${orderData.Phone}</span></h3>
      <h3 class="order-paymethod">Payment: <span>${orderData.PaymentMethod}</span></h3>

      <div>
          <h4>Items:</h4>
          <ul class="order-items">
              ${orderData.Products.map(product => `
                  <li>${product}</li>
              `).join('')}
          </ul>
      </div>
  `;


  document.querySelector('#orders').appendChild(orderDetailsDiv);
}






