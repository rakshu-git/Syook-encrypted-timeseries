 require('dotenv').config()
 const express = require('express')
 const app = express()
 const http = require('http').createServer(app);
 const connectDB = require('./config/db')
 const CryptoJS = require('crypto-js');
 const data = require('./data.json');
 const io = require('socket.io')(http, { 
     cors: { origin: "*" }
 });
 const sensor = require('./Model/DataModel')

    connectDB()

    io.on('connection', (socket) => {
    console.log('a user connected')
    setInterval(async () => {
      let savingData
      try {
        if (savingData) {
          return
        }
      savingData = true
  
        const AES_PASS_KEY = process.env.AES_KEY;
        function getRandomElement(array) {
          const randomIndex = Math.floor(Math.random() * array.length);
          return array[randomIndex];
        }
        const objectToEncrypt = {
          name: getRandomElement(data.names),
          origin: getRandomElement(data.cities),
          destination: getRandomElement(data.cities),
        };
  
        
        const jsonString = JSON.stringify(objectToEncrypt);
  
        const secret_key = CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex); //hashing our original object making it as a secret key to validate in front end
  
        const sumCheckMessage = {
          ...objectToEncrypt,
          secret_key,
        }
  
        const encryptedMessage = CryptoJS.AES.encrypt(JSON.stringify(sumCheckMessage), AES_PASS_KEY).toString();
  
        const Doc = new sensor({ name: encryptedMessage });
        const final = await Doc.save()
        socket.emit('message', final)
      } catch (e) {
        console.error(e)
      } finally {
        savingData = false
      }
    }, 10000)
  })
 
  http.listen(3665, () =>{ 
    console.log('listening on 3665') 
 })     