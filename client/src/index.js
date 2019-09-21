import "./scss/main.scss"
import axios from 'axios'
import {addTaskToDone} from './js/task-done';


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

const URL = 'http://localhost:3000/api';

let id1 = '5d82b4527f81363ec8162055';
let id2 = '5d85ad3c7d30410b4a4808dc';
let id3 = '5d8263c6d88e2138505385cd';

//adding new list//
const addButton = document.querySelector('navbar__createNewListButton');
const confirmButton = document.querySelector('.navbar__button');
const listNameInput = document.querySelector('addNewListWindow__form--input')

const listDzis = document.getElementById('dzis');
const listSzkola = document.getElementById('szkola');
const listPraca = document.getElementById('praca');
const listDom = document.getElementById('dom');
const listTaski = document.getElementById('taski');

listDzis.addEventListener('click', async() => {
    addListsToDOM(await getTasks(id1))
})
listPraca.addEventListener('click', async() => {
    addListsToDOM(await getTasks(id2))
})
listSzkola.addEventListener('click', async() => {
    addListsToDOM(await getTasks(id3))
})
listDom.addEventListener('click', async () => {
    addListsToDOM(await mainList(''))})
listTaski.addEventListener('click', async () => {
    addListsToDOM(await getTasks(''))})

//console.log(confirmButton)

//addButton.addEventListener('click', funkcja pokazująca ramkę z dodawaniem listy);

confirmButton.addEventListener('click', async (e) => {

    //const lists = await axios.get(`${URL}/lists`)
    //console.log(lists)
    mainTask()
})


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

//getting lists
const getLists = async () => {
    try {
        const id = '';
        const res = await axios.get(`${URL}/lists/${id}`);
        const lists = res.data;
        console.log(lists)
        return lists;
    } catch (e) {
        console.error(e);
    }
};
//console.log('listy'+ getLists());

//showing lists
const createLiList = item => {

    const li = document.createElement('li');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');

    btn1.classList.add('undoneContainer__taskList--edit', 'edit-list');
    btn2.classList.add('undoneContainer__taskList--delete');
    btn1.innerHTML ='<img src="src/img/edit.svg" alt="">';
    btn2.innerHTML ='<img delete="true" src="src/img/garbage.svg" alt="">';
    
    p1.appendChild(document.createTextNode(item.name));
    p3.appendChild(document.createTextNode(item.tasks));
    p2.appendChild(document.createTextNode(item.userId.name));

    li.id = item._id;
    li.appendChild(p1);
    li.appendChild(p3);
    li.appendChild(p2);
    li.appendChild(btn1);
    li.appendChild(btn2);
    
    if (item.done === true){
        li.classList.add("doneContainer__taskList--element");
    } else {
        li.classList.add("undoneContainer__taskList--element");
    }
    return li;
};

const addListsToDOM = lists => {
    const done = document.querySelector('.doneContainer__taskList');
    const undone = document.querySelector('.undoneContainer__taskList');
    
    if (Array.isArray(lists) && lists.length > 0) {
        lists.map(list => {
            if(list.done===true){
                console.log(list);
                done.appendChild(createLiList(list));
            } else {
                undone.appendChild(createLiList(list));
            }   
        });
    } else if (lists) {
        ul.appendChild(createLiList(lists));
    }

    document.querySelectorAll('.edit-list').forEach(btn => btn.addEventListener('click', async (e) => {
        const listId = e.currentTarget.parentNode.id;
        const edit = await axios.put(`${URL}/lists/${listId}`, {name: "nowa nazwa"}); 
        console.log(edit)
    }));
    
};

const mainList = async () => {
    addListsToDOM(await getLists());
};

//mainList ();

//getting tasks
const getTasks = async (id) => {
    try {
        //const id = '';
        const res = await axios.get(`${URL}/tasks/${id}`);
        const tasks = res.data;
        return tasks;
    } catch (e) {
        console.error(e);
    }
};

//showing tasks
const createLi = item => {

    const li = document.createElement('li');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');

    btn1.classList.add('undoneContainer__taskList--edit');
    btn2.classList.add('undoneContainer__taskList--done');
    btn1.innerHTML ='<img src="src/img/edit.svg" alt="">';
    btn2.innerHTML ='<img src="src/img/tick.svg" alt="">';
    
    p1.appendChild(document.createTextNode(item.name));
    p2.appendChild(document.createTextNode(item.done));

    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(btn1);
    li.appendChild(btn2);
    
    if (item.done === true){
        li.classList.add("doneContainer__taskList--element");
    } else {
        li.classList.add("undoneContainer__taskList--element");
    }
    return li;
};

const addTasksToDOM = tasks => {
    const done = document.querySelector('.doneContainer__taskList');
    const undone = document.querySelector('.undoneContainer__taskList');
    
    if (Array.isArray(tasks) && tasks.length > 0) {
        tasks.map(task => {
            if(task.done===true){
                console.log(task);
                done.appendChild(createLi(task));
            } else {
                undone.appendChild(createLi(task));
            }   
        });
    } else if (tasks) {
        ul.appendChild(createLi(tasks));
    }
};

const mainTask = async () => {
    addTasksToDOM(await getTasks());
};

//mainTask ();

