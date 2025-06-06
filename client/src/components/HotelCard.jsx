import React from 'react'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'

const HotelCard = ({rooms,index}) => {
  return (
    <Link to={'/rooms/'+ rooms._id} onClick={()=>scrollTo(0,0)} key={rooms._id} className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out'>
      <img src={rooms.images[0]} alt="room image" />
     { index%2==0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>Best Seller</p>
      
     } 
      <div className='p-4 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='font-playfair text-xl font-medium text-gray-800'>{rooms.hotel.name}</p>
          <div className='flex items-center gap-1'>
            <img src={assets.starIconFilled} alt="star-icon" />4.5
          </div>
        </div>
        <div className='flex items-center gap-1 text-sm'>
                      <img src={assets.locationIcon} alt="location-icon" />
                      <span>{rooms.hotel.address}</span>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <p><span className='text-xl text-gray-800'>${rooms.pricePerNight}</span>/night</p>
          <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>Book Now</button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard