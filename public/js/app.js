
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWa6nNgWGdsqS12OhqAfIlJcSbT59cLGs",
  authDomain: "tablerocontroldocente.firebaseapp.com",
  projectId: "tablerocontroldocente",
  storageBucket: "tablerocontroldocente.appspot.com",
  messagingSenderId: "184781501380",
  appId: "1:184781501380:web:cc14875f679e077f28ea91"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginButton = document.getElementById('login-btn');
const logoutButton = document.getElementById('logout-btn');
const authContainer = document.getElementById('auth-container');
const userInfoContainer = document.getElementById('user-info');
const userNameElement = document.getElementById('user-name');
const userRoleElement = document.getElementById('user-role');

const roles = {
    "admin@potros.itson.edu.mx": "administrador",
    "teacher1@potros.itson.edu.mx": "docentes",
    "auxiliar1@potros.itson.edu.mx": "auxiliares"
};

loginButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        'hd': 'potros.itson.edu.mx'
    });
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            if (user.email.endsWith('@potros.itson.edu.mx')) {
                const userRole = roles[user.email] || 'Unknown';
                updateUI(user, userRole);
            } else {
                auth.signOut();
                alert("Please use a @potros.itson.edu.mx email address.");
            }
        })
        .catch((error) => {
            console.error("Authentication error:", error);
        });
});

logoutButton.addEventListener('click', () => {
    auth.signOut();
    updateUI(null);
});

auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.email.endsWith('@potros.itson.edu.mx')) {
            const userRole = roles[user.email] || 'Unknown';
            updateUI(user, userRole);
        } else {
            auth.signOut();
        }
    } else {
        updateUI(null);
    }
});

function updateUI(user, role) {
    if (user) {
        authContainer.style.display = 'none';
        userInfoContainer.style.display = 'block';
        userNameElement.textContent = user.displayName;
        userRoleElement.textContent = role;
    } else {
        authContainer.style.display = 'block';
        userInfoContainer.style.display = 'none';
        userNameElement.textContent = '';
        userRoleElement.textContent = '';
    }
}
