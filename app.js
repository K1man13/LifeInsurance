// Import the functions you need from the Firebase SDKs
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth, db } from './firebase-config.js'; // Import Firebase configuration and services

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
            alert(`Login Error: ${error.message}`);
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
            const errorCode = error.code;
            const errorMessage = error.message;

            switch (errorCode) {
                case 'auth/email-already-in-use':
                    alert('This email is already in use.');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email format.');
                    break;
                case 'auth/weak-password':
                    alert('Password should be at least 6 characters.');
                    break;
                default:
                    alert(`Registration Error: ${errorMessage}`);
                    break;
            }
        });
}

// Logout function
function logout() {
    signOut(auth)
        .then(() => {
            document.getElementById('login-container').style.display = 'block';
            document.getElementById('calculator-container').style.display = 'none';
        })
        .catch(error => {
            alert(`Logout Error: ${error.message}`);
        });
}

// Premium calculation function
function calculatePremium() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value, 10);
    const gender = document.getElementById('gender').value.toLowerCase();
    const smokerStatus = document.getElementById('smokerStatus').value.toLowerCase();
    const coverageAmount = parseInt(document.getElementById('coverageAmount').value, 10);
    const policyTerm = parseInt(document.getElementById('policyTerm').value, 10);

    if (!name || isNaN(age) || !gender || !smokerStatus || isNaN(coverageAmount) || isNaN(policyTerm)) {
        alert('Please fill in all the fields correctly.');
        return;
    }

    let basePremium = coverageAmount * 0.05;
    let ageFactor = age * 10;
    let smokerFactor = smokerStatus === 'yes' ? 200 : 0;

    let premium = basePremium + ageFactor + smokerFactor;

    alert(`Calculated Premium: $${premium.toFixed(2)}`);

    const user = auth.currentUser;
    if (user) {
        setDoc(doc(db, 'users', user.uid), {
            name,
            age,
            gender,
            smokerStatus,
            coverageAmount,
            policyTerm,
            premium
        })
            .then(() => {
                alert('Data saved successfully.');
            })
            .catch(error => {
                alert(`Error saving data: ${error.message}`);
            });
    } else {
        alert('No user is logged in.');
    }
}

// Attach functions to the global window object
window.login = login;
window.register = register;
window.logout = logout;
window.calculatePremium = calculatePremium;
