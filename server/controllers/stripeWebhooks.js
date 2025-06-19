import { request, response } from 'express'
import stripe from 'stripe'
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
        return; // Stop further execution on error
    }

    //handle event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { bookingId } = session.metadata || {};

        if (!bookingId) {
            console.error("Booking ID missing in session metadata");
            return response.status(400).send("Booking ID missing in metadata");
        }

        try {
            await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: "stripe" });
            console.log(`Booking ${bookingId} marked as paid.`);
        } catch (error) {
            console.error("Error updating booking payment status:", error);
            return response.status(500).send("Failed to update booking payment status");
        }
    } else {
        console.log("Unhandled event type:", event.type);
    }
    response.json({ received: true });
}
