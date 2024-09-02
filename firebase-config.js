import { auth, db } from './firebase-config.js';

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('calculator-container').style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

// Registration function
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('User registered successfully.');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Logout function
function logout() {
    signOut(auth).then(() => {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('calculator-container').style.display = 'none';
    }).catch(error => {
        alert(error.message);
    });
}

// Premium calculation
function calculatePremium() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const smokerStatus = document.getElementById('smokerStatus').value;
    const coverageAmount = parseInt(document.getElementById('coverageAmount').value);
    const policyTerm = parseInt(document.getElementById('policyTerm').value);

    // Example Premium Calculation Logic
    let premium = coverageAmount * 0.05 + (age * 10) + (smokerStatus === 'Yes' ? 200 : 0);

    alert(`Calculated Premium: $${premium.toFixed(2)}`);

    // Save user data to Firebase Firestore
    const user = auth.currentUser;
    setDoc(doc(db, 'users', user.uid), {
        name, age, gender, smokerStatus, coverageAmount, policyTerm, premium
    }).then(() => {
        alert('Data saved successfully.');
    }).catch(error => {
        alert(error.message);
    });
}

window.login = login;
window.register = register;
window.logout = logout;
window.calculatePremium = calculatePremium;
