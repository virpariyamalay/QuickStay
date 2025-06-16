import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'



const FeacturedDestination = () => {
    const {rooms,navigate} =useAppContext();
    return rooms.length > 0 && (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24  bg-slate-50  py-20'>
            <Title title='Feactured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled comfort, top-notch amenities, and unforgettable experiences tailored just for you.' />
            <div className='flex flex-wrap items-center justify-center gap-6  mt-20 '>
                {rooms.slice(0, 4).map((room, index) => (
                    <HotelCard rooms={room} key={room._id} index={index} />
                ))}
            </div>

            <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}
            className='mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer hover:scale-105' >
            View All Destination
            </button>
        </div>
    )
}

export default FeacturedDestination