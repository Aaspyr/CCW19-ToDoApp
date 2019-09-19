import "./scss/main.scss"
import "./startPageHandelers"
import axios from 'axios'


//adding new list//
const addButton = document.querySelector('navbar__createNewListButton');
const confirmButton = document.querySelector('.navbar__button');
const listNameInput = document.querySelector('addNewListWindow__form--input')

console.log(confirmButton)

//addButton.addEventListener('click', funkcja pokazująca ramkę z dodawaniem listy);

confirmButton.addEventListener('click', async (e) => {

    const lists = await axios.get('http://localhost:3000/api/lists')
    console.log(lists)
})