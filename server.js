const express = require('express');
const app = express();
const cors = require('cors')
const { initializeApp } = require("firebase/app");
const { collection, getDocs, doc, setDoc, getFirestore } = require("firebase/firestore");
var bodyParser = require('body-parser');
const axios = require('axios');


app.use(cors())
//app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const firebaseConfig = {
    apiKey: "AIzaSyCMqaGo8dLe7dpRxpHR0HnAUNpd22AyWB4",

    authDomain: "artiweb-bd017.firebaseapp.com",

    projectId: "artiweb-bd017",

    storageBucket: "artiweb-bd017.appspot.com",

    messagingSenderId: "150139238820",

    appId: "1:150139238820:web:f25c407f6bebac50d1a931",

    measurementId: "G-ZKY2HJ04FY"

};
const firebase = initializeApp(firebaseConfig);
//Initialize Firestore
const fireBase = getFirestore(firebase);
// Initialize Firebase


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
})
app.post('/fcmToken/add', (req, res) => {
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
app.post('/sendNotif', async (req, res) => {
    const getAllTokens = await getDocs(collection(fireBase, "tokens"));
    const { title, body, urlImage } = req.body;

    try {
        getAllTokens.forEach(el => {
            // console.log(el.id, el.data())
            axios.post('https://fcm.googleapis.com/fcm/send', {
                "to": el.data().fcmToken,
                "notification": {
                    "title": title,
                    "body": body,
                    "mutable_content": true,
                    "sound": "Tri-tone",
                    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHbn403I5SsIX7I4PtV2v3Ov3htiHhind4g&usqp=CAU"
                },

                "data": {
                    "url": "",
                    "dl": "deeplinks"
                }
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "key=AAAAIvT--aQ:APA91bEfuHF56y1-LuKq2SeEf-q_AkuGDOpEIEqCtjr_VtA1KzbbM6LjIl-DhrMRJMYxfu1fO2JuZYVo7pBf01FBkOxBBETgaovrjYmiXK6DqgfficuYOyil7JdQiFH-NtpKwSCEaHe8"
                    }
                }
            )
        })
        res.send('Hey on a reussi')
    } catch (error) {
        res.status(400).json({ text: 'Une erreur est survenue', error })
    }

})



const appPort = process.env.PORT || 8085;
app.listen(appPort, (error) => {
    if (error) {
        return console.log('une erreur est survenue bg')
    }
    console.log('Hey ca marche');
})

