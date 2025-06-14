import Hotel from "../models/Hotel.js";
import User from "../models/User.js";


export const registerHotel = async(req,res)=>{
    try {
        
    const {name,contact,address,city}=req.body;
    const owner=req.user_id;

    //check if user is already a hotel owner
    const hotel= await Hotel.findOne({owner});
    if(hotel){
        res.json({success:flase,message:"Hotel Already Registered"});
    }

    else{
        await Hotel.create({name,contact,address,city});
        await User.findByIdAndUpdate(owner, {role:"hotelOwner"});   
        res.json({success:true,message:"Hotel Registered Successfully"});
    }
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
    

}