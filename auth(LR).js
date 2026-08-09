// ==============================
// Elements
// ==============================

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// ==============================
// Register User
// ==============================

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        // Get all registered users
        let users = JSON.parse(localStorage.getItem("havenUsers")) || [];

        // Check if email already exists
        const emailExists = users.some(user => user.email === email);

        if (emailExists) {
            alert("An account with this email already exists.");
            return;
        }

        // Create new user
        const user = {
            name,
            email,
            password
        };

        // Add new user
        users.push(user);
        // Save all users
        localStorage.setItem("havenUsers", JSON.stringify(users));
        alert("Registration successful!");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "auth.html";
    });
}

// ==============================
// Login User
// ==============================

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        const users = JSON.parse(localStorage.getItem("havenUsers")) || [];

        // Find matching user
        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );

        if (!user) {
            alert("Invalid email or password.");
            return;
        }

        // Save login session
        localStorage.setItem("loggedIn", "true");

        // Save who logged in
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "index1.html";
    });
}

// ==============================
// Update Navigation
// ==============================



// ==============================
// Logout
// ==============================


// ==============================
// Prevent Logged-in Users from
// Visiting Login/Register
// ==============================

const isLoggedIn = localStorage.getItem("loggedIn");
if (
    isLoggedIn === "true" &&
    (
        window.location.pathname.includes("login.html") ||
        window.location.pathname.includes("register.html")
    )
) {
    window.location.href = "index1.html";
}

// ==============================
// Mobile Menu
// ==============================



// ======================================
// AUTH PAGE SWITCH
// ======================================

const loginPanel = document.getElementById("login-panel");
const registerPanel = document.getElementById("register-panel");

const showRegisterForm = document.getElementById("show-register-form");
const showLoginForm = document.getElementById("show-login-form");

if (loginPanel && registerPanel) {

    function openRegister(e) {
        e.preventDefault();

        loginPanel.style.display = "none";
        registerPanel.style.display = "block";
    }

    function openLogin(e) {
        e.preventDefault();

        registerPanel.style.display = "none";
        loginPanel.style.display = "block";
    }

    showRegisterForm?.addEventListener("click", openRegister);
    showLoginForm?.addEventListener("click", openLogin);
}