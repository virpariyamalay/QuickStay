import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        //create s Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        //Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        //verify headers
        await whook.verify(JSON.stringify(req.body), headers);

        //getting data from request body
        const { data, type } = req.body;

        console.log("[Clerk Webhook] Received event:", type);
        console.log("[Clerk Webhook] Raw data:", JSON.stringify(data));

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses && data.email_addresses[0] ? data.email_addresses[0].email_address : undefined,
                    username: (data.first_name || "") + " " + (data.last_name || ""),
                    image: data.image_url,
                    recentSearchedCities: []
                };
                console.log("[Clerk Webhook] Creating user with data:", userData);
                try {
                    const createdUser = await User.create(userData);
                    console.log("[Clerk Webhook] User created successfully:", createdUser);
                } catch (err) {
                    console.error("[Clerk Webhook] Error creating user:", err);
                }
                break;
            }
            case "user.updated": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses && data.email_addresses[0] ? data.email_addresses[0].email_address : undefined,
                    username: (data.first_name || "") + " " + (data.last_name || ""),
                    image: data.image_url,
                    recentSearchedCities: []
                };
                console.log("[Clerk Webhook] Updating user with data:", userData);
                try {
                    const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
                    console.log("[Clerk Webhook] User updated successfully:", updatedUser);
                } catch (err) {
                    console.error("[Clerk Webhook] Error updating user:", err);
                }
                break;
            }
            case "user.deleted": {
                console.log("[Clerk Webhook] Deleting user with id:", data.id);
                try {
                    const deletedUser = await User.findByIdAndDelete(data.id);
                    console.log("[Clerk Webhook] User deleted successfully:", deletedUser);
                } catch (err) {
                    console.error("[Clerk Webhook] Error deleting user:", err);
                }
                break;
            }
            default:
                console.log("[Clerk Webhook] Unhandled webhook event type:", type);
                break;
        }

        res.json({ success: true, message: "webhook received" });

    } catch (error) {
        console.log("[Clerk Webhook] Handler error:", error);
        res.json({ success: false, message: error.message });
    }
};
export default clerkWebhooks;

