import axios from 'axios'


//adding new list//
const addButton = document.querySelector('navbar__createNewListButton');
const confirmButton = document.querySelector('addNewListWindow__form--confirmButton');
const listNameInput = document.querySelector('addNewListWindow__form--input')

//addButton.addEventListener('click', funkcja pokazująca ramkę z dodawaniem listy);

// confirmButton.addEventListener('click', function(e) {

//     axios.post('/list', {
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