// // kijken of de wachtwoorden overeenkomen
const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm_password").value
    const inputField = document.getElementById("confirm_password")

function confirmPasswordFunction(){
    
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
    
confirmPassword.addEventListener('input', confirmPasswordFunction())
    
    // // kijken of het wachtwoord voldoet aan de requirements
    function checkPassword() {
        const password = document.getElementById("password").value;
        const passwordSymbol = document.getElementById("password-symbol");
        const regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
        if (regularExpression.test(password)){
            passwordSymbol.textContent = "✓";
        } else {
            passwordSymbol.textContent = "✕";
        }
    }
    
password.addEventListener("input", checkPassword);