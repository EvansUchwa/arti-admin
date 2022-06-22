const express = require('express');
const app = express();
const cors = require('cors')
const { initializeApp } = require("firebase/app");
const { doc, setDoc, getFirestore } = require("firebase/firestore");

app.use(cors())
app.use(express.json())

const firebaseConfig = {
    apiKey: "AIzaSyCMqaGo8dLe7dpRxpHR0HnAUNpd22AyWB4",

    authDomain: "artiweb-bd017.firebaseapp.com",

    projectId: "artiweb-bd017",

    storageBucket: "artiweb-bd017.appspot.com",

    messagingSenderId: "150139238820",

    appId: "1:150139238820:web:f25c407f6bebac50d1a931",

    measurementId: "G-ZKY2HJ04FY"

};
// Initialize Firebase


app.get('/', (req, res) => {
    res.send('hihi ca marche')
})
app.post('/fcmToken/add', (req, res) => {
    const firebase = initializeApp(firebaseConfig);
    //Initialize Firestore
    const fireBase = getFirestore(firebase);
    const { fcmToken, macAddress } = req.body
    // Add a new document in collection "cities"
    setDoc(doc(fireBase, "tokens", macAddress), { fcmToken }).then(() => {
        console.log('ici la requete')
        res.send("token saved")

    }).catch((err) => {
        console.log('ici pas la requete')
        res.status(400).json(err);
    });
})

app.get('/fcmToken/get', (req, res) => {

})

const appPort = process.env.PORT || 8085;
app.listen(appPort, (error) => {
    if (error) {
        return console.log('une erreur est survenue bg')
    }
    console.log('Hey ca marche');
})

