import axios from 'axios'

//delete task
document.addEventListener('DOMContentLoaded', function() {
    const doneTask = document.querySelector(".doneContainer__taskList");
    doneTask.addEventListener('click', function(e) {
        if (e.target.closest('.doneContainer__taskList--bin') !== null) {
            const element = e.target.closest('.doneContainer__taskList--element');
            console.log(element);
            axios.delete(`http://localhost:3000/api/server/task.js/${element}`);
        }
    });
});