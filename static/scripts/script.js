console.log("test")

function confirmPassword(){
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm-password").value
    const confirmText = document.getElementById("confirm-text")

    if(password !== confirmPassword){
        confirmText.textContent = "Passwords don't match"
    } else {
        confirmText.textContent = "Passwords match"
    }

}