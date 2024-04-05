// Kijken of de wachtwoorden overeenkomen
function confirmPasswordFunction() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const inputField = document.getElementById("confirm_password");

    if (confirmPassword.length != 0) {
        if (password == confirmPassword) {
            console.log("match");
            inputField.style.border = "#175123 1px solid";
        } else {
            console.log("no match");
            inputField.style.border = "#931F17 1px solid";
        }
    }
}

// Kijken of het wachtwoord voldoet aan de requirements
function checkPassword() {
    const password = document.getElementById("password").value;
    const passwordSymbol = document.getElementById("password-symbol");
    const regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (regularExpression.test(password)) {
        passwordSymbol.textContent = "✓";
    } else {
        passwordSymbol.textContent = "✕";
    }
}

// Functies koppelen aan de inputfields
document.getElementById("confirm_password").addEventListener('input', confirmPasswordFunction);
document.getElementById("password").addEventListener("input", checkPassword);
