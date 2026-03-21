import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'







const Profile = () => {

    const [user, setUser] = useState({})
    const { backendURL, token } = useContext(ShopContext)
    const [editing, setEditing] = useState(false);

    const images = Object.values(
        import.meta.glob('../assets/ProfileImages/*.{jpg,jpeg,png}', { eager: true })
    ).map((img) => img.default);

    const getHash = (str = "") => {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        return Math.abs(hash);
    };



    const getUserImage = (userId) => {
        // if (!userId) return images[0]; // fallback image

        const hash = getHash(userId);
        const index = hash % images.length;
        return images[index];
    };


    const profile = async () => {


        try {

            const response = await axios.post(backendURL + "/api/user/profile", {}, { headers: { Authorization: `Bearer ${token}` } })
            console.log(response.data)

            if (response.data.success) {
                setUser(response.data.user)
            }


        } catch (error) {
            console.log(error)


        }
    }

    useEffect(() => {
        profile()
    }, [token])

    return (


        <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0]">

            {/* Profile Card */}
            <div className="relative backdrop-blur-md border border-pink-300 shadow-xl rounded-2xl p-8 w-[340px] text-center transition duration-500 shadow-pink-300 animate-fadeIn">

                {/* Floating Flower Decoration */}
                {/* <div className="absolute -top-4 -right-4 text-pink-300 text-xl animate-bounce">
                    🌸
                </div> */}

                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={getUserImage(user.id || user.email)}
                        alt="profile"
                        className="w-20 h-20 rounded-full shadow-md border-2 border-pink-100"
                    />
                </div>

                {/* Name */}

                <h2 className="text-xl font-semibold font-serif text-gray-700">
                    {user.name}
                </h2>


                {/* Email */}

                <p className="text-sm text-black-400 mt-1">
                    {user.email}
                </p>


                {/* Button */}
                {/* <button
                    onClick={() => setEditing(!editing)}
                    className="mt-6 px-6 py-2 rounded-full bg-pink-400 text-white text-sm font-medium shadow-md hover:bg-pink-500 transition duration-300 hover:scale-105"
                >
                    {editing ? "Save" : "Edit Profile"}
                </button> */}
            </div>
        </div>
    )
}

export default Profile
