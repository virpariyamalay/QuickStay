
// import stripe from 'stripe'
// import Booking from '../models/Booking.js';
// import { req, res } from 'express'



// //Api to handle stripe webhooks
// export const stripeWebhooks = async (req, res) => {
//     console.log("Stripe Webhooks Controller Loaded");
//     //Stripe Gateway initialize
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = req.headers['stripe-signature'];
//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//     } catch (err) {
//         res.status(400).send(`Webhook Error: ${err.message}`);
//         return; // Stop further execution on error
//     }
//     console.log("befort if");
//     //handle event
//     if (event.type === "checkout.session.completed") {
//         const session = event.data.object;
//           console.log("✅ Webhook received for checkout.session.completed");
//     console.log("✅ Session metadata:", session.metadata);
//         const { bookingId } = session.metadata || {};
//          console.log("✅ Booking ID from metadata:", bookingId);

//         if (!bookingId) {
//             console.error("Booking ID missing in session metadata");
//             return response.status(400).send("Booking ID missing in metadata");
//         }

//         try {
//             await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: "stripe",status: "confirmed" });
//             console.log(`Booking ${bookingId} marked as paid.`);
//         } catch (error) {
//             console.error("Error updating booking payment status:", error);
//             return response.status(500).send("Failed to update booking payment status");
//         }
//     } else {
//         console.log("Unhandled event type:", event.type);
//     }
//     response.json({ received: true });
// }

import stripe from 'stripe'
import { request, response } from 'express'
import Booking from '../models/Booking.js';

//Api to handle stripe webhooks
export const stripeWebhooks = async (request, response) => {
    //Stripe Gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        
    }

    //handle event
    if (event.type === "payment_intent.succeeded" ) {
        
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;
        
        //getting session metadata
        const session =await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
            
        });

        const {bookingId}= session.data[0].metadata;
        //mark payment as paid
        await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"stripe"})
    } else{
        console.log("unhandled event type:", event.type);
    }
   response.json({ received: true });
}