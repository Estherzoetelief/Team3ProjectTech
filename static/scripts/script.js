function confirmPassword(){
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm_password").value
    const inputField = document.getElementById("confirm_password")
    // const confirmText = document.getElementById("confirm-text")

if(confirmPassword.length != 0){
        if(password == confirmPassword){
     console.log("match")
       inputField.style.border = "green 1px solid"
    } else {
        console.log("no match")
        inputField.style.border = "red 1px solid"
    } 
} 
}

window.setInterval(confirmPassword, 100)

function checkInlog(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const logInButton = document.getElementById("logInButton")
 
    if(email.length != 0 && password.length != 0){
        logInButton.style.opacity = "100%"
    }
    else{
        logInButton.style.opacity = "75%"
    }
}

window.setInterval(checkInlog, 100)