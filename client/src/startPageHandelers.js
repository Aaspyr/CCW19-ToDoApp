const startForm = document.getElementsByClassName('startBox')
const logForm = document.getElementsByClassName('logBox')
const registerForm = document.getElementsByClassName('registerBox')

const logButton = document.getElementsByClassName("startBox__logButton button_login")
const registerButton = document.getElementsByClassName("startBox__registerButton button_login")

function switchScreen (on, off1, off2) {
    for (let i =0; i<on.length; i+=1){
        if (on[i].style.display === "none") {
            on[i].style.display = "flex";
            off1[i].style.display = "none";
            off2[i].style.display = "none";
        }else{
            on[i].style.display === "flex"
        }
    }
}

logButton.onclick = switchScreen(logForm, startForm, registerForm)
registerButton.onclick = switchScreen(registerForm, startForm, logForm)
