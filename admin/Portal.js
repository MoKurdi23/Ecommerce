
// portal.js
import { fetchUsers, addUserToDOM } from "./main.js";




export function showDetails(item) {
  const list = document.querySelector(".tab-content.active .list");
  list.style.display = "none";
  item.classList.remove("hidden");
  item.classList.add("active");
  item.classList.add("flexx");
}
document.addEventListener("DOMContentLoaded", async () => {

  function showPopupForm() {
    const popupForm = document.getElementById('popupForm');
    popupForm.classList.remove('hidden');
  }

  function hidePopupForm() {
    const popupForm = document.getElementById('popupForm');
    popupForm.classList.add('hidden');
  }


  document.querySelector('#products button').addEventListener('click', showPopupForm);
  document.getElementById('closeFormBtn').addEventListener('click', hidePopupForm);

   // Fetch users from Firestore
   const users = await fetchUsers();
   console.log("Fetched Users:", users);
 
   // Add each user to the DOM
   users.forEach((user) => {
     addUserToDOM(user.email, user.password);
   });
  // Fetch Steve's Weight from Firestore
  // const steveWeight = await fetchSteveWeight();
  // console.log("Steve's Weight:", steveWeight);  // Log it for testing
 

  // Tab switching functionality
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      backToList();
      tabs.forEach((t) => t.classList.remove("active"));  // Remove active class from all tabs
      tabContents.forEach((content) => content.classList.remove("active"));  // Hide all tab contents
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");  // Show the clicked tab content
    });
  });

  // Show details view


  // Handle order click event
  // document.querySelector('li.order1').addEventListener('click', (e) => {
  //   if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'I') {
  //     showDetails(document.querySelector('#order1'));
  //   }
  // });

  // Back to list view
  function backToList() {
    const list = document.querySelector(".tab-content.active .list");
    const details = document.querySelectorAll(".details");
    list.style.display = "block";
    details.forEach(detail => {
      detail.classList.add("hidden");
      detail.classList.remove('flexx');
      detail.classList.remove('active');
    });
  }

  // Handle back to list click (House icon)


  // Popup Form Handlers

  // Attach event listeners for the popup form
  
});




