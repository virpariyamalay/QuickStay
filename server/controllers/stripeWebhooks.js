import stripe from 'stripe'
import { request, response } from 'express'
import Booking from '../models/Booking.js';

//Api to handle stripe webhooks
export const stripeWebhooks = async (request, response) => {
    console.log("[Clerk Webhook] Handler started", request.headers);
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
    if (event.type === "payment_intent.succeeded") {

        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        //getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,

        });

        const { bookingId } = session.data[0].metadata;
        //mark payment as paid
        await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: "stripe", status: "confirmed" });
    } else {
        console.log("unhandled event type:", event.type);
    }
    response.json({ received: true });
}