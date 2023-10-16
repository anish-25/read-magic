const firebase = require('firebase/compat/app');
require('firebase/compat/storage');

const firebaseConfig = {
    apiKey: "AIzaSyCKoUXIWU454QNsNAIBHHItwLkHAZS5klg",
    authDomain: "readmagic-1acec.firebaseapp.com",
    projectId: "readmagic-1acec",
    storageBucket: "readmagic-1acec.appspot.com",
    messagingSenderId: "349177490403",
    appId: "1:349177490403:web:bbd58532724af4cc0d8ed6",
    measurementId: "G-1GV6BNP2Q5"
};

if (!firebase?.apps?.length) {
    firebase.initializeApp(firebaseConfig);
}
module.exports = firebase;