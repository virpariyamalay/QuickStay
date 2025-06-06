import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'
import Title from './Title'

const ExclusiveOffers = () => {
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 gap-10 pb-30'>
            <div className='flex flex-col md:flex-row items-center justify-between w-full'>
                <Title align='left' title='Exclusive Offers' subtitle='take advantage of our limited time offers and special packages to enhance your stay and create unforgettable memories.' />
                <button className='group flex items-center gap-2 px-6 py-3  text-black rounded-lg hover: transition duration-300 cursor-pointer hover:scale-105'>
                    View All Offers
                    <img src={assets.arrowIcon} alt="arrow-icon"
                        className='group -hover:translate-x-1 transition-all  ' />
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
                 {exclusiveOffers.map((item) => (
                    <div
                        key={item._id}
                        className='group relative flex flex-col justify-end p-6 h-80 rounded-xl text-white bg-no-repeat bg-cover bg-center shadow-lg'
                        style={{ backgroundImage: `url(${item.image})`}}
                    >
                        {/* Offer Tag */}
                        <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>
                            {item.priceOff}% OFF
                        </p>

                        {/* Overlay content */}
                        <div className=''>
                            <p className='text-2xl font-medium font-playfair '>{item.title}</p>
                            <p className='text-sm mt-1'>{item.description}</p>
                            <p className='text-xs text-white/70 mt-3'>Valid until: {item.expiryDate}</p>
                        </div>
                        <button className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5'>
                            View Offers
                            <img className='invert group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="arrow-icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExclusiveOffers