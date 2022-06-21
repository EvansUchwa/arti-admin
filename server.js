const express = require('express');
const app = express();
const cors = require('cors')
const { initializeApp } = require("firebase/app");
const { doc, setDoc, getFirestore } = require("firebase/firestore");

app.use(cors())
app.use(express.json())

const firebaseConfig = {
    apiKey: "AIzaSyCaFIJ_bto6XBOuc5Rt7NbTsYYvo5omFx4",
    authDomain: "artistore-ec301.firebaseapp.com",
    projectId: "artistore-ec301",
    storageBucket: "artistore-ec301.appspot.com",
    messagingSenderId: "593171698780",
    appId: "1:593171698780:web:9b415e6672b15ab904c299"
};
// Initialize Firebase


app.get('/', (req, res) => {
    res.send('hihi ca marche')
})
app.post('/fcmToken/add', (req, res) => {
    const firebase = initializeApp(firebaseConfig);
    //Initialize Firestore
    const fireBase = getFirestore(firebase);
    // Add a new document in collection "cities"
    setDoc(doc(fireBase, "tokens", "fcmToken"), { fcToken: req.body.fcmToken }).then(() => {
        console.log('ici la requete')
        res.send("token saved")

    }).catch((err) => {
        console.log('ici pas la requete')
        res.status(400).json(err);
    });
})

app.get('/fcmToken/get', (req, res) => {

})


app.listen(8085, (error) => {
    if (error) {
        return console.log('une erreur est survenue bg')
    }
    console.log('Hey ca marche');
})

