const startForm = document.querySelector('startBox')
const logForm = document.querySelector('logBox')
const registerForm = document.querySelector('registerBox')

const logButton = document.querySelector("startBox__logButton")
const registerButton = document.querySelector("startBox__registerButton")

function switchScreen (on, off1, off2) {
    if (on.style.display === "none") {
        on.style.display = "block";
        off1.style.display = "none";
        off2.style.display = "none";
    } else {
        on.style.display = "none";
    }
  }

logButton.addEventListener('click', switchScreen(logForm, startForm, registerForm))
registerButton.addEventListener('click', switchScreen(registerForm, startForm, logForm))