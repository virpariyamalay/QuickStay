import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    try {
        console.log("[Protect Middleware] req.auth:", req.auth);
        const { userId } = req.auth || {};
        console.log("[Protect Middleware] Extracted userId:", userId);

        if (!userId) {
            console.log("[Protect Middleware] No userId found in req.auth");
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findById(userId);
        console.log("[Protect Middleware] User found:", user);
        if (!user) {
            console.log("[Protect Middleware] User not found with ID:", userId);
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("[Protect Middleware] Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const { userId } = req.auth ;

//     if (!userId) {
//       // console.error("User ID not found in request auth");
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       // console.error("User not found with ID:", userId);
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Protect middleware error:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

