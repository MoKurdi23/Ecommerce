import { getFirestore, doc, getDoc, collection, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

//from firebase project
const firebaseConfig = {
    apiKey: "AIzaSyAvhcMK0PrHjBoRRWuXp7_fLcIdmgmw_Z4",
    authDomain: "durdtech.firebaseapp.com",
    projectId: "durdtech",
    storageBucket: "durdtech.firebasestorage.app",
    messagingSenderId: "3475160455",
    appId: "1:3475160455:web:54de4a586c4841be746722",
    measurementId: "G-QCMDGKWBSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);// get actual databse
const auth = getAuth(app)









//wait for data to be fetched then manipulate dom
document.addEventListener('DOMContentLoaded', function () {

    
   document.querySelector('.cartCounter').textContent=
localStorage.getItem('cartCounter') ;




    let currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null //save current user if exists














    function displayNone(selector) {
        selector.style.display = 'none';
    }

    function displayflex(selector) {
        selector.style.display = 'flex';
    }


    // toggle login form and fade background
    function loginAppear() {
        const dashboard = document.querySelector('.container-dashboard');
        dashboard.classList.toggle('hidden-login');

        displayflex(document.querySelector('.login-container'))
        displayflex(document.querySelector('.login-signup'));
    }

    function loginDissappear() {
        const dashboard = document.querySelector('.container-dashboard');
        dashboard.classList.toggle('hidden-login');

        displayNone(document.querySelector('.login-container'))
        displayNone(document.querySelector('.login-signup'));

    }








    document.querySelector('.login-signup').querySelector('.fa-x').addEventListener('click', loginDissappear)
    document.querySelector('.login-top-right').addEventListener('click', loginAppear)

    //adds user to our database
    async function addUserToDatabase(email, pass) {// async to make sure all data is addded before dom manipulations
        try {
            const customID = email//name of doc created
            await setDoc(doc(db, "Names", customID), { //literally thats how you add a doc lol

                email: email
                , pass: pass
            });

        } catch (e) {
            console.error("Error writing document: ", e);
        }
    }




    //function to create user
    async function createUser() {
        try {
            const signupForm = document.querySelector('.signup-form');
            const formData = new FormData(signupForm)
            const formDataObject = {}
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            }
            )
            const email = formDataObject["email-reg"];
            const password = formDataObject["password-reg"];
            currentUser = await createUserWithEmailAndPassword(auth, email, password);
            addUserToDatabase(email, password)
            alert('User Created Successfuly!!')

            loginDissappear()

        }

        catch (e) {
            alert(`Error creating user: ${e.code}`);



        }



    }

    //function to login user
    async function loginUser() {

        try {
            const loginForm = document.querySelector('.login-form');
            const formData = new FormData(loginForm)
            const formDataObject = {}
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            }
            )
            const email = formDataObject["email-log"];  //when using special characters for name , have to use []
            const password = formDataObject["password-log"];
            currentUser = await signInWithEmailAndPassword(auth, email, password);
            alert('Logged In Successfully!!!!')

            loginDissappear()




        }

        catch (e) {

            alert('Error logging in');


        }




    }



    //add event listener to signup form
    document.querySelector('.signup-form').addEventListener('submit', async (e) => {
        e.preventDefault()

        await createUser()

    })




    //add event listener to login form
    document.querySelector('.login-form').addEventListener('submit', async (e) => {
        e.preventDefault()

        await loginUser()

    })




    //logout button signs us out
    document.querySelector('.logOutBtn').addEventListener('click', async () => {
        await signOut(auth);

        alert('Logged out successfully!');

        document.querySelector('.logOutBtn').style.display = 'none'
    });



    // This listens to authentication state changes and acts according to the state (logged in or no)
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            document.querySelector('.login-top-right').style.display = 'none'
            localStorage.setItem('user', JSON.stringify(currentUser))

            document.querySelector('.logOutBtn').style.display = 'inline'
        }
        else {
            document.querySelector('.login-top-right').style.display = 'inline'
            localStorage.setItem('user', null)
            currentUser = null
            document.querySelector('.logOutBtn').style.display = 'none'

        }
    });





    document.querySelector('.Logo').addEventListener('click', () => {


        document.querySelector('.hero').style.display = 'flex'
        document.querySelector('.products').style.marginTop = '150px';


        document.querySelectorAll('.product-grid .product-card').forEach((card) => {
            card.style.display = 'flex'

        })


      





    })


    document.querySelector('.searchForm').addEventListener('submit', (e) => {

        e.preventDefault()
        document.querySelector('.hero').style.display = 'none'
        document.querySelector('.products').style.marginTop = '40px';


        const grid = document.querySelector('.product-grid')
        const cards = grid.querySelectorAll('.product-card')
        const input = document.querySelector('.searchBar')

        cards.forEach((card) => {
            const name =  card.querySelector('.name').textContent.toLowerCase()
            if (!(name.includes(input.value.toLowerCase()))) {
                card.style.display = 'none'
            }

        })








    })




})








