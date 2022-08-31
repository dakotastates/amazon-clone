// require('dotenv').config()
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const admin = require('firebase-admin');


// API

// - App Config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// app.post('/payments/create', async (req, res) =>{
//   const total = req.query.total;
//
//
//   // console.log('Payment request recieved', total)
//
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total, //subunits -- pennies
//     currency: 'usd'
//   });
//
//   // OK -- created
//   res.status(201).send({
//     clientSecret: paymentIntent.client_secret
//   })
// })

// - Listen command


exports.api = functions.https.onRequest(app);

// Setup Custom User Claims (Admin)

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=>{
  // get user and add custom claim (admin)

  // 1) get user by email
  return admin.auth().getUserByEmail(data.email).then(user =>{
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  }).then(()=>{
    return {
      message: `Success! ${data.email} has been made an admin`
    }
  }).catch(err => {
    return err;
  });
});
