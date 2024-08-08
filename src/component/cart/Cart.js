import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

function Cart() {
    const [cartId, setCartId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/images')
            .then(response => setImages(response.data))
            .catch(error => console.error('Lỗi không lấy được ảnh:', error));
    }, []);

    useEffect(() => {
        if (!user || !user.id) {
            console.error("User is not logged in or user ID is missing");
            return;
        }

        // Lấy cartId từ API
        const fetchCartId = async () => {
            try {
                console.log("User ID:", user.id);
                const response = await axios.get(`http://localhost:8080/api/cart/cartId`, { params: { accountId: user.id } });
                setCartId(response.data);
            } catch (error) {
                console.error("Error fetching cart ID", error);
            }
        };

        fetchCartId();
    }, [user]);

    useEffect(() => {
        if (cartId) {
            // Lấy cartItems từ API
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/cart/cartItems`, { params: { cartId } });
                    setCartItems(response.data);
                } catch (error) {
                    console.error("Error fetching cart items", error);
                }
            };

            fetchCartItems();
        }
    }, [cartId]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartItems]);

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Ngăn không cho số lượng giảm xuống dưới 1

        console.log(`Gửi yêu cầu cập nhật số lượng: itemId=${itemId}, newQuantity=${newQuantity}`);

        try {
            // Gửi yêu cầu cập nhật số lượng
            await axios.post('http://localhost:8080/api/cart/updateQuantity', null, {
                params: { itemId, newQuantity }
            });

            // Cập nhật giỏ hàng sau khi thay đổi số lượng
            const updatedItems = cartItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity, totalPrice: item.product.price * newQuantity } : item
            );
            setCartItems(updatedItems);

            // Cập nhật tổng tiền
            const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            setTotalPrice(newTotalPrice);

        } catch (error) {
            console.error("Error updating quantity", error);
        }
    };
    const handleRemoveItem = (itemId) => {
        // Xác nhận xóa sản phẩm
        if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

        // Gửi yêu cầu xóa sản phẩm
        axios.delete(`http://localhost:8080/api/cart/remove/${itemId}`)
            .then(() => {
                // Cập nhật giỏ hàng sau khi xóa
                const updatedItems = cartItems.filter(item => item.id !== itemId);
                setCartItems(updatedItems);

                // Cập nhật tổng tiền
                const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                setTotalPrice(newTotalPrice);

                // Hiển thị thông báo xóa thành công
                alert("Sản phẩm đã được xóa khỏi giỏ hàng.");
            })
            .catch(error => {
                console.error("Error removing item", error);
            });
    };

    return (
        <>
            <main className="main-content">
                <div className="layout-cart">
                    <div className="breadcrumb-shop">
                        <div className="container container-pd1">
                            <div className="breadcrumb-list">
                                <ol className="breadcrumb breadcrumb-arrows">
                                    <li><a href="/home"><span>Trang chủ</span></a></li>
                                    <li><a href="/home"><span>Giỏ hàng ({cartItems.length})</span></a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="wrraper-mainCart">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="mainCart-detail">
                                        <div className="heading-cart heading-row">
                                            <h1>Giỏ hàng của bạn</h1>
                                            <p>Bạn đang có <strong className="count-cart">{cartItems.length} sản phẩm</strong> trong giỏ hàng</p>
                                        </div>
                                        <div className="list-pageform-cart">
                                            <form onSubmit={(e) => e.preventDefault()}> {/* Ngăn không cho form submit */}
                                                <div className="cart-row">
                                                    <div className="table-cart">
                                                        {cartItems.map((item) => (
                                                            <div className="cart-item" key={item.id}>
                                                                <div className="media-left">
                                                                    <div className="item-img">
                                                                        {images.find(image => image.products.id === item.product.id) && (
                                                                            <img
                                                                                src={images.find(image => image.products.id === item.product.id).name}
                                                                                alt={images.find(image => image.products.id === item.product.id).name}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className="item-remove">
                                                                        <a href="#"
                                                                           onClick={() => handleRemoveItem(item.id)}>Xóa</a>
                                                                    </div>
                                                                </div>
                                                                <div className="media-right">
                                                                    <div className="item-info">
                                                                    <h3 className="intem-title">
                                                                            <a href="/home">{item.product.name}</a>
                                                                        </h3>
                                                                        <p>{item.variant?.name}</p>
                                                                    </div>
                                                                    <div className="item-price">
                                                                        <p><span>{item.product.price}.000₫</span></p>
                                                                    </div>
                                                                </div>
                                                                <div className="media-total">
                                                                    <div className="item-total-price">
                                                                        <div className="item-price">
                                                                            <span className="line-item-total">{item.product.price * item.quantity}.000₫</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="item-quantity">
                                                                        <div className="quantity-partent">
                                                                            <button
                                                                                className="qty-btn"
                                                                                type="button"
                                                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                            >
                                                                                <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect height="1" width="18" y="9" x="1"></rect>
                                                                                </svg>
                                                                            </button>
                                                                            <input className="item-qty" type="text" value={item.quantity} readOnly />
                                                                            <button
                                                                                className="qty-btn"
                                                                                type="button"
                                                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                            >
                                                                                <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect x="9" y="1" width="1" height="17"></rect>
                                                                                    <rect x="1" y="9" width="17" height="1"></rect>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="wrap-order-summary">
                                        <div className="order-summary-block">
                                            <h2 className="summary-title">Thông tin đơn hàng</h2>
                                            <div className="summary-total">
                                                <p>Tổng tiền: <span>{totalPrice}.000₫</span></p>
                                            </div>
                                            <div className="summary-button">
                                                <a className="checkout-btn btnred "href="">THANH TOÁN</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Cart;
