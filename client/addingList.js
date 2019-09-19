import axios from 'axios'

const addButton = document.querySelector('navbar__createNewListButton');
const confirmButton = document.querySelector('addNewListWindow__form--confirmButton');
const listNameInput = document.querySelector('addNewListWindow__form--input')

//addButton.addEventListener('click', funkcja pokazująca ramkę z dodawaniem listy);

confirmButton.addEventListener('click', function(e) {

    axios.post('/user', {
        userID: '', 
        name: listNameInput.value,
        createdAt: new Date().getDate,
        color: '',
        tasks: []
    })
    .then(function (response) {
    console.log(response)
    })
    .catch(function (error) {
    console.log(error)
    })
})