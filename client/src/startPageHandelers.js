import "./scss/main.scss"

const startForm = document.getElementsByClassName('startBox')
const logForm = document.getElementsByClassName('logBox')
const registerForm = document.getElementsByClassName('registerBox')

const logButton = document.getElementById('logButton')
const registerButton = document.getElementById('registerButton')

logButton.onclick = function () {
    for (let i =0; i<logForm.length; i+=1){
            logForm[i].style.display = "block";
            registerForm[i].style.display = "none";
            startForm[i].style.display = "none";
    }
}

registerButton.onclick = function () {
    for (let i =0; i<registerForm.length; i+=1){
            registerForm[i].style.display = "block";
            logForm[i].style.display = "none";
            startForm[i].style.display = "none";
    }
}
