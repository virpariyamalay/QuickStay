import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react'
import { toast } from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([])

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms')


            if (data.success) {
                setRooms(data.rooms)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }


    const fetchUser = async () => {
        try {
            const token = await getToken();
            if (!token) {
                toast.error("No authentication token found. Please sign in again.");
                return;
            }
            // console.log("Token being sent:", token); // Uncomment for debugging
            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setIsOwner(data.role === "hotelOwner")
                setSearchedCities(data.recentSearchedCities)
            }
            else {
                //retry Fetching user Details after 5 second
                setTimeout(() => {
                    fetchUser()
                }, 5000)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchUser();
        }

    }, [user])

    useEffect(() => {
        fetchRooms();
    }, [])


    const value = {
        currency, navigate, user, getToken, isOwner, setIsOwner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, rooms, setRooms, fetchRooms
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext); 