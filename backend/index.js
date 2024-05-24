const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const SSLCommerzPayment = require('sslcommerz-lts')


const store_id = 'israt664f797730589'
const store_passwd = '654321'
const is_live = false //true for live, false for sandbox

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});

//const tran_id = new ObjectId().toString();

app.post("/order", async (req, res) => {
    const { totalPrice, products } = req.body;
  
    if (!totalPrice || !products) {
      return res.status(400).send({ success: false, message: "Invalid order data" });
    }
  
    console.log("Order hit:", req.body);
  
    const data = {
      total_amount: totalPrice, 
      currency: 'BDT',
      tran_id: 'REF123',
      success_url: 'http://localhost:3030/success',
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: 'Order Products',
      product_category: 'Various',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };
  
    console.log("payment data :", data);
  
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data)
      .then(apiResponse => {
        // Log the API response
        console.log("API Response:", apiResponse);
        
        // Check if the response contains GatewayPageURL
        const GatewayPageURL = apiResponse.GatewayPageURL;
        if (!GatewayPageURL) {
          throw new Error("GatewayPageURL not found in API response");
        }
  
        // Redirect the user to payment gateway
        console.log('Redirecting to: ', GatewayPageURL);
        res.send({ success: true, url: GatewayPageURL });
      })
      .catch(error => {
        console.error("Error initiating payment:", error);
        res.status(500).send({ success: false, message: "Error initiating payment" });
      });
  });
  
  


