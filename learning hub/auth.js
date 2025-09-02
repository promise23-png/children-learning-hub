// Authentication functions
function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
}

// Check if user is logged in and update UI
function checkAuthState() {
    firebase.auth().onAuthStateChanged(function(user) {
        const authLink = document.getElementById('auth-link');
        if (user) {
            // User is signed in
            authLink.innerHTML = '<a href="#" class="btn-logout">Logout</a>';
            const logoutBtn = document.querySelector('.btn-logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    firebase.auth().signOut().then(() => {
                        window.location.reload();
                    });
                });
            }
        } else {
            // No user is signed in
            authLink.innerHTML = '<a href="login.html" class="btn-login">Login</a>';
        }
    });
}

// Check if user is logged in before accessing content
function checkLogin() {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert('Please login first to access this content');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize auth state check when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();
    
    // Form submissions (for login.html)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            login(email, password)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    alert('Login error: ' + error.message);
                });
        });
    }
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            signup(email, password)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    alert('Signup error: ' + error.message);
                });
        });
    }
    
    const resetForm = document.getElementById('reset-form');
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            
            resetPassword(email)
                .then(() => {
                    alert('Password reset email sent');
                    resetForm.reset();
                    document.getElementById('back-to-login').click();
                })
                .catch(error => {
                    alert('Reset error: ' + error.message);
                });
        });
    }
});