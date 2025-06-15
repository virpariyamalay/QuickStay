import Hotel from "../models/Hotel.js";
import User from "../models/User.js";


export const registerHotel = async(req,res)=>{
    try {
        
    const {name,contact,address,city}=req.body;
    const owner=req.user ? req.user._id : null;

    if(!owner){
        return res.json({success:false,message:"User not authenticated"});
    }

    //check if user is already a hotel owner
    const hotel= await Hotel.findOne({owner});
    if(hotel){
        res.json({success:false,message:"Hotel Already Registered"});
        return;
    }

    else{
        await Hotel.create({name,address,contact,city,owner});
        await User.findByIdAndUpdate(owner, {role:"hotelOwner"});   
        res.json({success:true,message:"Hotel Registered Successfully"});
    }
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
    

}

