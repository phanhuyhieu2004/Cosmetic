import React, { createContext, useContext, useState, useEffect } from 'react';
import Home from "./component/home/Home";
import axios from "axios";

// Tạo Context
const CartContext = createContext();

// Provider để cung cấp dữ liệu cho các component con
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartId, setCartId] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!user || !user.id) {
            console.error("Không có tài khoản thì không xem được giỏ hàng");
            return;
        }

        // Lấy cart Id từ API
        const fetchCartId = async () => {
            try {
                console.log("User ID:", user.id);
                const response = await axios.get(`http://localhost:8080/api/cart/cartId`, {params: {accountId: user.id}});
                setCartId(response.data);
            } catch (error) {
                console.error("Lỗi không lấy được cart ID", error);
            }
        };

        fetchCartId();
    }, [user]);



    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cart/cartItems`, {params: {cartId}});
            setCartItems(response.data);

        } catch (error) {
            console.error("Lỗi k lấy được mục giỏ hàng", error);
        }
    };


    useEffect(() => {
        fetchCartItems();

    }, [cartId]);
    // Tính toán số lượng mỗi khi giỏ hàng thay đổi
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('total', total); // Cập nhật vào localStorage
        setCartQuantity(total); // Cập nhật state cho số lượng
    }, [cartItems]); // Chạy mỗi khi cartItems thay đổi

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartQuantity,fetchCartItems  }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook để sử dụng context
export const useCart = () => useContext(CartContext);
