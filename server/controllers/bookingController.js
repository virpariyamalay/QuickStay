import Booking from "../models/Booking.js"
import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"

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
            user: req.auth.userId,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
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

export const getHotelBookings = async(req,res)=>{
    try {
        const hotel=await Hotel.findOne({owner:req.auth.userId});
    if(!hotel){
        return res.json({success:false,message:"No Hotel Found"})
    }

    const bookings= await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({createdAt:-1})

    //total Bookings
    const totalBookings=booking.length;
    //total revenue
    const totalRevenue=bookings.reduce((acc,booking)=>  acc + booking.totalPrice ,0)

    res.json({success:true,dashboardData:{totalBookings,totalRevenue,bookings}})
    } catch (error) {
            res.json({success:false,message:"failed to fetch booking"})

    }
}