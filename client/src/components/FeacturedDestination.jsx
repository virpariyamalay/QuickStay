import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'



const FeacturedDestination = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24  bg-slate-50  py-20'>
            <Title title='Feactured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled comfort, top-notch amenities, and unforgettable experiences tailored just for you.' />
            <div className='flex flex-wrap items-center justify-center gap-6  mt-20 '>
                {roomsDummyData.slice(0, 4).map((room, index) => (
                    <HotelCard rooms={room} key={room._id} index={index} />
                ))}
            </div>

            <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)} }>View All Destination</button>
        </div>
    )
}

export default FeacturedDestination