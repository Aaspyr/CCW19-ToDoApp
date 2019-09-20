import "./scss/main.scss"
import "./startPageHandelers"
import axios from 'axios'

//-----------------------------------------------------------------------------------------------------------------
//  WYŚWIETLANIE LISTY Z LISTAMI

// const addButton = document.querySelector('navbar__createNewListButton');
// const confirmButton = document.querySelector('.navbar__button');
// const listNameInput = document.querySelector('addNewListWindow__form--input')

//console.log(confirmButton)
// confirmButton.addEventListener('click', async (e) => {

//     const lists = await axios.get('http://localhost:3000/api/lists')
//     console.log(lists)
// })

//----------------------------------------------------------------------------------------------------------------
//DODAWANIE NOWEJ LISTY

// const addsButton = document.getElementById('addList');
// const confirmsButton = document.querySelector('addNewListWindow__form--confirmButton');
// const listNamesInput = document.querySelector('addNewListWindow__form--input')
// const addNewList = document.getElementsByClassName('addNewListWindow')
// const newListBackground = document.getElementsByClassName('newListBackground');

// addsButton.onclick = function() {
//     for (let i =0; i<addNewList.length; i+=1){
//         addNewList[i].style.display = "block";
//         newListBackground[0].style.background = 'rgba(255,255,255, 0.5)';
        
//     }
// };

// confirmButton.addEventListener('click', function(e) {

//     axios.post('/lists', {
//         userID: '', 
//         name: listNameInput.value,
//         createdAt: new Date().getDate,
//         color: '',
//         tasks: []
//     })
//     .then(function (response) {
//     console.log(response)
//     })
//     .catch(function (error) {
//     console.log(error)
//     })
// })