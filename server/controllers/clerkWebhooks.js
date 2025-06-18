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


        console.log("Webhook event type:", type);
        console.log("User data to be processed:", userData);

        switch (type) {
            case "user.created": {
                try {
                    const userData = {
                        _id: data.id,
                        email: data.email_addresses[0].email_address,
                        username: data.first_name + " " + data.last_name,
                        image: data.image_url,
                        recentSearchedCities: []
                    }

                    await User.create(userData);
                    console.log("User created successfully");
                } catch (err) {
                    console.error("Error creating user:", err);
                }
                break;
            }


            case "user.updated": {
                try {
                    const userData = {
                        _id: data.id,
                        email: data.email_addresses[0].email_address,
                        username: data.first_name + " " + data.last_name,
                        image: data.image_url,
                        recentSearchedCities: []
                    }

                    await User.findByIdAndUpdate(data.id, userData);
                    console.log("User updated successfully");
                } catch (err) {
                    console.error("Error updating user:", err);
                }
                break;
            }

            case "user.deleted": {
                try {
                    await User.findByIdAndDelete(data.id);
                    console.log("User deleted successfully");
                } catch (err) {
                    console.error("Error deleting user:", err);
                }
                break;
            }

            default:
                console.log("Unhandled webhook event type");
                break;
        }

        res.json({ success: true, message: "webhook received" });

    } catch (error) {
        console.log("Webhook processing error:", error);
        res.json({ success: false, message: error.message });


    }
}

export default clerkWebhooks;
