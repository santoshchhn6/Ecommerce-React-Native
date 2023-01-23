import express from "express";
import * as dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-08-27",
});
const app = express();
const port = 3000;

// console.log(process.env.STRIPE_PUBLISH_KEY);
// console.log(process.env.STRIPE_PRIVATE_KEY);

app.listen(port, () => console.log(`Server listing on port:${port}`));

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "inr",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
