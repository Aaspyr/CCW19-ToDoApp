import {/*funkcje z index.js*/} from '../index';

//zmienne
const done = document.querySelectorAll(".undoneContainer__taskList--done");
const doneContainer = document.querySelector(".doneContainer__taskList");

//switching task to done
export const addTaskToDone = (() => {  
    done.forEach( element => {
        element.addEventListener("click", e => {
            doneContainer.insertBefore(e.target.parentElement, doneContainer.nextElementSibling)
            e.target.hidden = true;
        })
    })
})();
