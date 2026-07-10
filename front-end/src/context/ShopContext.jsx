import { createContext, useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useTrackEvent from "../hooks/useTrackEvent";



export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";
    const delivery_fee = 100;
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [products, setProducts] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(false)

    const track = useTrackEvent()



    const navigate = useNavigate()


    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
            toast.success("Item Added To Cart");
        }

        else {
            cartData[itemId] = 1
            toast.success("Item Added To Cart");
        }

        setCartItems(cartData);


        if (token) {
            try {

                await axios.post(backendURL + "/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } })

                await track(itemId, "cart", token, backendURL);



            } catch (error) {
                console.log(error)
                toast.error(error.message)

            }
        }
    }


    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            try {
                if (cartItems[items] > 0) {
                    totalCount += cartItems[items]
                }

            } catch (error) {

            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendURL + "/api/cart/update", { itemId, quantity }, { headers: { Authorization: `Bearer ${token}` } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)


            }
        }

    }


    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => (product._id === items))
            try {
                if (cartItems[items] > 0) {
                    totalAmount += itemInfo.price * cartItems[items]
                }
            }
            catch (error) {

            }
        }
        return totalAmount;
    }


    useEffect(() => {
        if (token) {
            getUserCart(token)
        }
    }, [token])



    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems")
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
    }, [])


    useEffect(() => {
        if (!token) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        }
    }, [cartItems, token])          ////////Check This   Remove (!token) 







    const getProductsData = async () => {

        try {

            setLoading(true)

            const response = await axios.get(backendURL + "/api/product/list")

            if (response.data.success) {


                const optimizedProducts = response.data.products.map(product => {
                    if (product.image && Array.isArray(product.image)) {
                        return {
                            ...product,
                            image: product.image.map(imgUrl =>
                                // Automatically requests optimized format, auto-quality, and a maximum width of 400px
                                imgUrl.replace("/upload/", "/upload/f_auto,q_auto,w_400,c_scale/")
                            )
                        }
                    }
                    return product;
                });


                setProducts(optimizedProducts)
            }
            else {
                toast.error(response.data.message || "Failed to fetch products")
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setLoading(false)
    }



    const getUserCart = async (token) => {
        try {

            console.log("TOKEN FROM CONTEXT 👉", token);

            const response = await axios.post(
                backendURL + "/api/cart/get",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("CART FROM DB 👉", response.data.cartData);

            if (response.data.success) {

                const dbCart = response.data.cartData || {};
                const guestCart = JSON.parse(localStorage.getItem("cartItems")) || {};

                if (guestCart && Object.keys(guestCart).length > 0) {
                    const mergedCart = { ...dbCart };

                    for (const item in guestCart) {
                        if (mergedCart[item]) {
                            mergedCart[item] += guestCart[item];
                        }
                        else {
                            mergedCart[item] = guestCart[item];
                        }
                    }
                    setCartItems(mergedCart);

                    localStorage.removeItem("cartItems")
                }
                else {
                    setCartItems(dbCart);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleWishlist = async (token, productId) => {

        const previousWishlist = [...wishlist];

        // Update UI immediately
        const isAdding = !wishlist.includes(productId);

        // Optimistic UI update
        if (isAdding) {
            setWishlist([...wishlist, productId]);
        } else {
            setWishlist(wishlist.filter(id => id !== productId));
        }

        try {
            console.log("Token:", token);
console.log("ProductId:", productId);

            const response = await axios.post(
                backendURL + "/api/wishlist/toggle-wishlist",
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setWishlist(response.data.wishlist)
                if(isAdding){
                    await track(productId, "wishlist", token, backendURL)
                }
            }
        } catch (error) {
            setWishlist(previousWishlist);
            console.log(error)

        }
    }

    const getWishlist = async (token) => {
        try {

            const response = await axios.get(
                backendURL + "/api/wishlist/get-wishlist",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setWishlist(response.data.wishlist)
                console.log(wishlist)
            }


        } catch (error) {
            console.log(error)

        }
    }





    useEffect(() => {
        getProductsData()
    }, [])



    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
            getWishlist(token)
        }
    }, [token]);


    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendURL,
        token, setToken,
        wishlist, setWishlist,
        toggleWishlist, getWishlist,
        loading, setLoading
    }



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;