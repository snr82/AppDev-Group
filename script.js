// Encrypting Text
async function encrypt(text){
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2,"0")).join("");
}

// Register
document.getElementById("registerBtn").addEventListener("click", async() => {
    const username = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;

    if(password.length < 8){
        alert("Password must be at least 8 characters long.");
        return;
    }

    const encrypted = await encrypt(password);
    const userData = { username, password: encrypted};

    // Save to localStorage
    localStorage.setItem(username, JSON.stringify(userData));
    document.getElementById("message").textContent = "Registration successful!";

});

// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    const stored = localStorage.getItem(username);
    if(!stored){
        document.getElementById("message").textContent = "User not found!";
        return;
    }

    const userData = JSON.parse(stored);
    const encrypted = await encrypt(password);

    if(encrypted === userData.password){
        document.getElementById("message").textContent = "Login successful!";
    }
    else{
        document.getElementById("message").textContent = "Invalid password!";
    }
});
