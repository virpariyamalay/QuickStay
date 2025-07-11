import Booking from "../models/Booking.js"
import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import transporter from "../configs/nodemailer.js";
import stripe from 'stripe'

//function to check availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;

    } catch (error) {
        console.error(error.message);
    }

}
// const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
//   try {
//     const bookings = await Booking.find({
//       room,
//       checkInDate: { $lte: checkOutDate },
//       checkOutDate: { $gte: checkInDate }, // Fix: overlap condition
//     });
//     return bookings.length === 0;
//   } catch (error) {
//     console.error("Error in checkAvailability:", error.message);
//     throw new Error("Failed to check availability");
//   }
// };


//api to check availability of room
//POST /api/bookings/check-availability

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room })
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}
// export const checkAvailabilityAPI = async (req, res) => {
//   try {
//     const { room, checkInDate, checkOutDate } = req.body;
//     const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });

//     res.json({ success: true, isAvailable });
//   } catch (error) {
//     console.error("API Error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


//API to create a new booking
//POST api/bookings/books

export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;

        if (!req.user || !req.user.email || !req.user.username) {
            return res.json({ success: false, message: "User data incomplete" });
        }

        const user = req.user._id;

        //before booking check availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available" })
        }
        //Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;
        //calculate total price based on nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;


        const booking = await Booking.create({
            // user: req.auth.userId,
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: req.user.email,
        //     subject: "Hotel Booking Details",
        //     html: `
        //         <h2>Your Booking Details</h2>
        //         <p>Dear ${req.user.username},</p>
        //         <p>Thank you for your booking! Here are your details:</p>
        //         <ul>
        //             <li><strong>Booking ID:</strong> ${booking._id}</li>
        //             <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
        //             <li><strong>Location:</strong> ${roomData.hotel.address}</li>
        //             <li><strong>Date:</strong> ${booking.checkInDate.toDateString()} to ${booking.checkOutDate.toDateString()}</li>
        //             <li><strong>Booking Amount:</strong> ₹ ${booking.totalPrice} /night</li>
        //          </ul>
        //          <p>We look forward to welcoming you!</p>
        //          <p>If you need to make any changes ,feel free to contact us.</p>
        //     `
        // }
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "✅ Booking Confirmed — QuickStay Hotel Reservation",
            html: `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background-color: #007B5E; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 26px;">Your Booking is Confirmed!</h1>
        <p style="margin: 5px 0 0;">Thank you for choosing QuickStay</p>
      </div>
      
      <!-- Booking Details -->
      <div style="padding: 30px;">
        <p style="font-size: 16px;">Hi <strong>${req.user.username}</strong>,</p>
        <p>We’re delighted to confirm your booking. Below are your reservation details:</p>
        
        <div style="background-color: #f2f2f2; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <table style="width: 100%; font-size: 15px;">
            <tr>
              <td style="padding: 8px 0;"><strong>Hotel Name:</strong></td>
              <td style="padding: 8px 0;">${roomData.hotel.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Location:</strong></td>
              <td style="padding: 8px 0;">${roomData.hotel.address}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Check-In:</strong></td>
              <td style="padding: 8px 0;">${booking.checkInDate.toDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Check-Out:</strong></td>
              <td style="padding: 8px 0;">${booking.checkOutDate.toDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Amount:</strong></td>
              <td style="padding: 8px 0;">$${booking.totalPrice} / night</td>
            </tr>
          </table>
        </div>

        <!-- CTA -->
        

        <!-- Message -->
        <p style="font-size: 15px;">We look forward to welcoming you at <strong>${roomData.hotel.name}</strong>. If you have any questions or need to make changes, feel free to <a href="#" style="color: #007B5E; text-decoration: none;">contact us</a>.</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f1f1; text-align: center; padding: 20px; font-size: 13px; color: #555;">
        <p style="margin: 0;">Need help? <a href="#" style="color: #007B5E;">Visit Support</a> or email us at <a href="mailto:support@quickstay.com" style="color: #007B5E;">support@quickstay.com</a></p>
        <p style="margin: 10px 0 0;">© ${new Date().getFullYear()} QuickStay. All rights reserved.</p>
      </div>

    </div>
  </div>
  `
        };


        // await transporter.sendMail(mailOptions)
        try {
            await transporter.sendMail(mailOptions);
            //   console.log("Email sent: ", info.response); // Add this
            // console.log("Sending email to:", req.user.email);

        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Don't fail the whole booking because of email
        }


        res.json({ success: true, message: "Booking Created Successfully" })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to create booking" });

    }
};

// export const createBooking = async (req, res) => {
//   try {
//     const { room, checkInDate, checkOutDate, guests } = req.body;

//     const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
//     if (!isAvailable) {
//       return res.json({ success: false, message: "Room is not available" });
//     }

//     const roomData = await Room.findById(room).populate("hotel");
//     if (!roomData) {
//       console.error("Room not found");
//       return res.status(404).json({ success: false, message: "Room not found" });
//     }

//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
//     const totalPrice = roomData.pricePerNight * nights;

//     const booking = await Booking.create({
//       user: req.auth.userId, // ✅ FIX: You forgot to pass 'user' — probably this was the issue
//       room,
//       hotel: roomData.hotel._id,
//       guests: +guests,
//       checkInDate,
//       checkOutDate, // ✅ Typo fix: this was wrongly spelled as `checkoutDate`
//       totalPrice,
//     });

//     res.json({ success: true, message: "Booking Created Successfully" });
//   } catch (error) {
//     console.error("Create Booking Error:", error); // ✅ Show full error
//     res.status(500).json({ success: false, message: "Failed to create booking" });
//   }
// };


//API to get all bookings for a user
//GET /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });
        res.json({ success: true, bookings })
    } catch (error) {
        res.json({ success: false, message: "Failed to fatch Booking" })

    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel Found" })
        }

        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 })

        //total Bookings
        const totalBookings = bookings.length;
        //total revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
    } catch (error) {
        res.json({ success: false, message: "failed to fetch booking" })

    }
}

export const stripePayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        const roomData = await Room.findById(booking.room).populate('hotel')
        const totalPrice = booking.totalPrice
        const { origin } = req.headers;

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: roomData.hotel.name,
                    },
                    unit_amount: totalPrice * 100
                },
                quantity: 1,
            }
        ]

        console.log(bookingId)
        //Create Checkout Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata: {
                bookingId,
            }
        })
        res.json({ success: true, url: session.url })

    } catch (error) {
        res.json({ success: false, message: "Payment Failed" })

    }
}

