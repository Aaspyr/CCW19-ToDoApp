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

//getting tasks
const URL = '*';
const getTasks = async () => {
    try {
        const res = await axios.get('${*}/tasks');
        
        const tasks = res.data;

        return tasks;
    } catch (e) {
        console.error(e);
    }
};

//showing tasks
const createLi = item => {
    const li = document.createElement('li');

    li.appendChild(document.createTextNode(item.title));

    return li;
};

const addTasksToDOM = tasks => {
    const ul = document.querySelector('ul');

    if (Array.isArray(tasks) && tasks.length > 0) {
        tasks.map(task => {
            ul.appendChild(createLi(task));
        });
    } else if (tasks) {
        ul.appendChild(createLi(tasks));
    }
};

const main = async () => {
    addTasksToDOM(await getTasks());
};

main ();