// import React, { useState } from 'react'
// import { assets, cities } from '../assets/assets'
// import { useAppContext } from '../context/AppContext'

// const Hero = () => {
    
//     const {navigate,getToken,axios,setSearchedCities}=useAppContext()
//     const [destination,setDestination]=useState("")

//     const onSearch =async (e)=>{
//         e.preventDefault();
//         navigate(`/rooms?destination=${destination}`)

//         //call api to save recent searched city
//         await axios.post('/api/user/store-recent-search',
//             {recentSearchedCity:destination},
//             { headers: { Authorization: `Bearer ${await getToken()}` } }
//         )

//         //add destination to searchedCities max 3 recent searched cities
//         setSearchedCities((prevSearchedCities)=>{
//             const updatedSearchedCities = [...prevSearchedCities,destination];
//             if(updatedSearchedCities.length > 3){
//                 updatedSearchedCities.shift();
//             }
//             return updatedSearchedCities;
//         })
//     }



//   return (
//     <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white  bg-[url("/src/assets/heroImage.png")] bg-cover bg-center bg-no-repeat h-screen'>
//       <p className='bg-[#49b9ff]/50 px-3.5 py-1 rounded-full mt-20 text-white-500'>The Ultimate Hotel Experience</p>
//       <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4 '>Discover Your Perfect Getaway Destination</h1>
//       <p className='max-w-130 mt-2 text-sm md:text-base'>unparalleled luxury and comfort await at the world's most exclusive hotels and resorts.start your journey today.</p>

//        <form onSubmit={onSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-12  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

//             <div>
//                 <div className='flex items-center gap-2'>
//                    {/* <img src={assets.calenderIcon} alt="calendericon" /> */}
//                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4'><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
//                     <label htmlFor="destinationInput">Destination</label>
//                 </div>
//                 <input onChange={e=> setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
//             </div>
//             <datalist id='destinations'>
//               {cities.map((city, index) => (
//                 <option key={index} value={city}/>
//               ))}
//             </datalist>
//             <div>
//                 <div className='flex items-center gap-2'>
//                     <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
//                     </svg>
//                     <label htmlFor="checkIn">Check in</label>
//                 </div>
//                 <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
//             </div>

//             <div>
//                 <div className='flex items-center gap-2'>
//                     <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
//                     </svg>
//                     <label htmlFor="checkOut">Check out</label>
//                 </div>
//                 <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
//             </div>

//             <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
//               <div className='flex items-center gap-2'>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='h-4'><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z"/></svg>
//                 <label htmlFor="guests">Guests</label>
//             </div>
//                 <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
//             </div>

//             <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
//                 <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
//                     <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
//                 </svg>
//                 <span>Search</span>
//             </button>
//         </form>
//     </div>
    
//   )
// }

// export default Hero

import React, { useState } from 'react';
import { assets, cities } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const today = new Date().toISOString().split('T')[0];

  const onSearch = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      return alert('Please select both check-in and check-out dates.');
    }

    if (checkOut <= checkIn) {
      return alert('Check-out date must be after check-in date.');
    }

    if (checkIn < today) {
      return alert('Check-in date cannot be in the past.');
    }

    navigate(
      `/rooms?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );

    // Save recent search
    await axios.post(
      '/api/user/store-recent-search',
      { recentSearchedCity: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    setSearchedCities((prev) => {
      const updated = [...prev, destination];
      if (updated.length > 3) updated.shift();
      return updated;
    });
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-cover bg-center bg-no-repeat h-screen'>
      <p className='bg-[#49b9ff]/50 px-3.5 py-1 rounded-full mt-20 text-white-500'>
        The Ultimate Hotel Experience
      </p>
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>
        Discover Your Perfect Getaway Destination
      </h1>
      <p className='max-w-130 mt-2 text-sm md:text-base'>
        Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
      </p>

      <form
        onSubmit={onSearch}
        className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-12 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'
      >
        {/* Destination */}
        <div>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4'>
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
        </div>

        <datalist id="destinations">
          {cities.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>

        {/* Check-In */}
        <div>
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) {
                setCheckOut('');
              }
            }}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            required
          />
        </div>

        {/* Check-Out */}
        <div>
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            required
          />
        </div>

        {/* Guests */}
        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='h-4'>
              <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z" />
            </svg>
            <label htmlFor="guests">Guests</label>
          </div>
          <input
            min={1}
            max={4}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="0"
            required
          />
        </div>

        {/* Submit */}
        <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
          <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
