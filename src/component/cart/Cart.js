import React from "react";
import "./Cart.css"

function Cart() {
    return (
        <>
            <main className="main-content">

                <div className="layout-cart">
                    <div className="breadcrumb-shop">
                        <div className="container container-pd1">
                            <div className="breadcrumb-list">
                                <ol className="breadcrumb breadcrumb-arrows">
                                    <li><a href="/home"><span>Trang chủ</span></a></li>
                                    <li><a href="/home"><span>Gio hàng(4)</span></a></li>
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
                                            <h1>Gio hàng của bạn</h1>
                                            <p>Bạn đang có <strong className="count-cart">4 san phâm </strong>trong
                                                giỏ hàng</p>
                                        </div>
                                        <div className="list-pageform-cart">
                                            <form>
                                                <div className="cart-row">
                                                    <div className="table-cart">
                                                        <div className="cart-item">
                                                            <div className="media-left">
                                                                <div className="item-img">
                                                                    <a href="https://product.hstatic.net/200000073977/product/banner-web-sp_1000x1000px_02-2_78c2b03291c4417281b78adc4b31f0f1_medium.jpg">
                                                                        <img
                                                                            src="https://product.hstatic.net/200000073977/product/banner-web-sp_1000x1000px_02-2_78c2b03291c4417281b78adc4b31f0f1_medium.jpg"/>
                                                                    </a>
                                                                </div>
                                                                <div className="item-remove">
                                                                    < a href="/home">Xóa</a>
                                                                </div>
                                                            </div>
                                                            <div className="media-right">
                                                                <div className="item-info">
                                                                    <h3 className="intem-title">
                                                                        < a href="/home">B 6 son li</a>
                                                                    </h3>
                                                                </div>
                                                                <div className="item-price">
                                                                    <p><span>2,154,000₫</span></p>
                                                                </div>
                                                            </div>
                                                            <div className="media-total">
                                                                <div className="item-total-price">
                                                                    <div className="item-price">
                                                                        <span
                                                                            className="line-item-total">4,308,000₫</span>
                                                                    </div>
                                                                </div>
                                                                <div className="item-quantity">
                                                                    <div className="quantity-partent">
                                                                        <button className="qty-btn">
                                                                            <svg width="18" height="18"
                                                                                 viewBox="0 0 20 20"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <rect height="1" width="18" y="9"
                                                                                      x="1"></rect>
                                                                            </svg>
                                                                        </button>
                                                                        <input className="item-qty" type={"text"}
                                                                               value={1}/>
                                                                        <button className="qty-btn">
                                                                            <svg width="18" height="18"
                                                                                 viewBox="0 0 20 20"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <rect x="9" y="1" width="1"
                                                                                      height="17"></rect>
                                                                                <rect x="1" y="9" width="17"
                                                                                      height="1"></rect>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cart-item">
                                                            <div className="media-left">
                                                                <div className="item-img">
                                                                    <a href="https://product.hstatic.net/200000073977/product/banner-web-sp_1000x1000px_02-2_78c2b03291c4417281b78adc4b31f0f1_medium.jpg">
                                                                        <img
                                                                            src="https://product.hstatic.net/200000073977/product/banner-web-sp_1000x1000px_02-2_78c2b03291c4417281b78adc4b31f0f1_medium.jpg"/>
                                                                    </a>
                                                                </div>
                                                                <div className="item-remove">
                                                                    < a href="/home">Xóa</a>
                                                                </div>
                                                            </div>
                                                            <div className="media-right">
                                                                <div className="item-info">
                                                                    <h3 className="intem-title">
                                                                        < a href="/home">B 6 son li</a>
                                                                    </h3>
                                                                </div>
                                                                <div className="item-price">
                                                                    <p><span>2,154,000₫</span></p>
                                                                </div>
                                                            </div>
                                                            <div className="media-total">
                                                                <div className="item-total-price">
                                                                    <div className="item-price">
                                                                        <span
                                                                            className="line-item-total">4,308,000₫</span>
                                                                    </div>
                                                                </div>
                                                                <div className="item-quantity">
                                                                    <div className="quantity-partent">
                                                                        <button className="qty-btn">
                                                                            <svg width="18" height="18"
                                                                                 viewBox="0 0 20 20"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <rect height="1" width="18" y="9"
                                                                                      x="1"></rect>
                                                                            </svg>
                                                                        </button>
                                                                        <input className="item-qty" type={"text"}
                                                                               value={1}/>
                                                                        <button className="qty-btn">
                                                                            <svg width="18" height="18"
                                                                                 viewBox="0 0 20 20"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <rect x="9" y="1" width="1"
                                                                                      height="17"></rect>
                                                                                <rect x="1" y="9" width="17"
                                                                                      height="1"></rect>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cart-item">
                                                            <div className="media-left">
                                                                <div className="item-img">
                                                                    <a href="https://product.hstatic.net/200000073977/product/banner-web-sp_1000x1000px_02-2_78c2b03291c4417281b78adc4b31f0f1_medium.jpg">
                                                                        <img
                                                                            src="https://product.hstatic.net/200000073977/product/banner-web-sp_1000x1000px_02-2_78c2b03291c4417281b78adc4b31f0f1_medium.jpg"/>
                                                                    </a>
                                                                </div>
                                                                <div className="item-remove">
                                                                    < a href="/home">Xóa</a>
                                                                </div>
                                                            </div>
                                                            <div className="media-right">
                                                                <div className="item-info">
                                                                    <h3 className="intem-title">
                                                                        < a href="/home">B 6 son li</a>
                                                                    </h3>
                                                                </div>
                                                                <div className="item-price">
                                                                    <p><span>2,154,000₫</span></p>
                                                                </div>
                                                            </div>
                                                            <div className="media-total">
                                                                <div className="item-total-price">
                                                                    <div className="item-price">
                                                                        <span
                                                                            className="line-item-total">4,308,000₫</span>
                                                                    </div>
                                                                </div>
                                                                <div className="item-quantity">
                                                                    <div className="quantity-partent">
                                                                        <button className="qty-btn">
                                                                            <svg width="18" height="18"
                                                                                 viewBox="0 0 20 20"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <rect height="1" width="18" y="9"
                                                                                      x="1"></rect>
                                                                            </svg>
                                                                        </button>
                                                                        <input className="item-qty" type={"text"}
                                                                               value={1}/>
                                                                        <button className="qty-btn">
                                                                            <svg width="18" height="18"
                                                                                 viewBox="0 0 20 20"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <rect x="9" y="1" width="1"
                                                                                      height="17"></rect>
                                                                                <rect x="1" y="9" width="17"
                                                                                      height="1"></rect>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                <p>Tổng tiền: <span>4,308,000₫</span></p>
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
    )

}

export default Cart;