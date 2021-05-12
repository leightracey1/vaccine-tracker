require('dotenv').config(); 

const cron = require("node-cron");
const axios = require("axios");
const cheerio = require("cheerio");
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);



cron.schedule("*/1 * * * *", () => {
    getHackensackAppt(); 
})

getHackensackAppt();
function getHackensackAppt() {
    axios.get("https://www.hackensackmeridianhealth.org/covid19/").then(function(response){
    const $ = cheerio.load(response.data); 

    if (!$("#pagealert2").text() || $("#pagealert2").text() != "All appointments currently are full. We hope to schedule again as more vaccines are received. Thank you for your patience. Please continue to check back.") {
        alertOfOpening("Hackensack Meridian Health");
    }
})
}

function alertOfOpening(hospital) {
    client.messages
  .create({
     body: hospital,
     from: '16148201652',
     to: '2013595898'
   })
  .then(message => console.log(message.sid))
  .catch(err => console.log(err));
}