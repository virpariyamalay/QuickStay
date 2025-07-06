import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'


const Layout = () => {
  const { isOwner, navigate, axios, getToken, user } = useAppContext()
  const [rooms, setRooms] = useState([])

   // Fetch rooms for the hotel ownerAdd commentMore actions
  const fetchRooms = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner',
        { headers: { Authorization: `Bearer ${await getToken()}` } })
      if (data.success) {
        setRooms(data.rooms)
      }
    } catch (error) {
      // Optionally handle error
    }
  }, [axios, getToken])

  useEffect(() => {
    if (user) {
      fetchRooms()
    }
  }, [user, fetchRooms])

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])

  return (
    <div className='flex flex-col h-screen'>
            <Navbar />
      <div className='flex h-full'>
        <Sidebar />
        <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
          <Outlet context={{ rooms, setRooms, fetchRooms }} />
        </div>
          </div>
    </div>
  )
}

export default Layout