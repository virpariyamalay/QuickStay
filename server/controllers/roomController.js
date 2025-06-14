import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary} from 'cloudinary'


//API to create a new room hor hotel
export const createRoom = async (req, res) =>{
    try {
        const {roomType,pricePerNight,amenities}=req.body;
        const hotel=await Hotel.findOne({owner:req.auth.userId});
        if(!hotel){
            return res.json({success:false,message:"hotel not found"})
        }

        //upload image to cloudinary
        const uploadImages=req.files.map(async(file)=>{
             const response= await cloudinary.uploader.upload(file.path);
             return response.secure_url;
        })

        //wait for all uploads to complete
        const images= await Promise.all(uploadImages);

        await Room.create({
            hotel:hotel._id,
            roomType,
            pricePerNight:+pricePerNight,
            amenities:json.parse(amenities),
            images,
        })
        res.json({success:true,message:"Room Created Successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

//API to get all room
export const getRoom = async (req, res) =>{

}


//API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) =>{

}


//API to toggle avalibility of a room
export const toggleRoomAvailability = async (req, res) =>{

}