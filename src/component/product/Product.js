import "./Product.css"
import Slider from "react-slick";
import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Product() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 1000
    };
    return (
        <>
            <main className="main-content">
                <div className="layout-productDetail">
                    <div className="breadcrumb-shop">
                        <div className="container container-pd1">
                            <div className="breadcrumb-list">
                                <ol className="breadcrumb breadcrumb-arrows">
                                    <li><a href="/home"><span>Trang chủ</span></a></li>
                                    <li><a href="/home"><span>Tất cả sản phẩm</span></a></li>
                                    <li><a href="/home"><span>Son Kem lâu trôi</span></a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <section className="productDetail-information">
                        <div className="container container-pd2">
                            <div className="productDetail--main">
                                <div className="productDetail--gallery">
                                    <div className="stickyProduct-gallery">
                                        <div className="product-container-gallery">
                                            <div className="wrapbox-gallery">
                                                <div className="wrapbox-image wrapbox-image-verticalSlide">
                                                    <div className="productGallery_slider">
                                                        <Slider {...settings}>
                                                            <div>
                                                                <img className="image-detail"
                                                                     src="https://product.hstatic.net/200000073977/product/38_effde4cf8b464d8ba0d98289036451a0.png"
                                                                     alt="Slide 1"/>
                                                            </div>
                                                            <div>
                                                                <img className="image-detail"
                                                                     src="https://product.hstatic.net/200000073977/product/38_effde4cf8b464d8ba0d98289036451a0.png"
                                                                     alt="Slide 1"/>
                                                            </div>
                                                            <div>
                                                                <img className="image-detail"
                                                                     src="https://product.hstatic.net/200000073977/product/38_effde4cf8b464d8ba0d98289036451a0.png"
                                                                     alt="Slide 1"/>
                                                            </div>
                                                            <div>
                                                                <img className="image-detail"
                                                                     src="https://product.hstatic.net/200000073977/product/38_effde4cf8b464d8ba0d98289036451a0.png"
                                                                     alt="Slide 1"/>
                                                            </div>

                                                        </Slider>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="productDetailjs productDetail--content">
                                    <div className="wrapbox-detail">
                                        <div className="product-heading">
                                            <h1>Son Kem M.O.I Phiên Bản Mùa Lễ Hội [Mua 2 Tặng 1]</h1>
                                        </div>
                                        <div className="product-price">
<span className="pro-price">379,000₫</span>
                                        </div>
                                        <div className="product-variants">
                                            <form>
                                                <div className="select-swatch clearfix">
                                                    <div className="swatch clearfix">
<div className="title-swap header">
Màu sắc:<strong>ĐỎ GẠCH</strong>
</div>
                                                        <div className="select-swap">
                                                            <div className="n-sd swatch-element color do-gach  ">
                                                                <label className="do-gach sd"
                                                                       htmlFor="swatch-0-do-gach">
                                                                    <span>DO GACH</span>
                                                                </label>
                                                            </div>
                                                            <div className="n-sd swatch-element color do-gach  ">
                                                                <label className="do-gach sd"
                                                                       htmlFor="swatch-0-do-gach">
                                                                    <span>DO NAU</span>
                                                                </label>
                                                            </div>
                                                            <div className="n-sd swatch-element color do-gach  ">
                                                                <label className="do-gach sd"
                                                                       htmlFor="swatch-0-do-gach">
                                                                    <span>DO RUBY</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="product-actions">
                                            <div className="select-actions d-lg-flex clearfix">
                                                <div className="quantity-area">
                                                    <div className="quantity-title">Quantity:</div>
                                                    <div className="box-qtt">

                                                        <button type="button" onClick="HRT.All.minusQuantity()"
                                                                className="qty-btn">
                                                            <svg focusable="false" className="icon icon--minus "
                                                                 viewBox="0 0 10 2" role="presentation">
                                                                <path d="M10 0v2H0V0z"></path>
                                                            </svg>
                                                        </button>
                                                        <input type="text" id="quantity" name="quantity" value="1"
                                                               min="1" className="quantity-input"/>
                                                        <button type="button" onClick="HRT.All.plusQuantity()"
                                                                className="qty-btn">
                                                            <svg focusable="false" className="icon icon--plus "
                                                                 viewBox="0 0 10 10" role="presentation">
                                                                <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="addcart-area">
                                                        <button type="button" id="add-to-cart"
                                                                className="add-to-cartProduct button dark btn-addtocart addtocart-modal"
                                                                name="add"><span className="btn-pr">Thêm vào giỏ</span></button>
                                                    </div>
                                                </div>
                                                <div className="addcart-area">

                                                    <button type="button" id="buy-now"
                                                            className="button dark btn-buynow btnred addtocart-modal"
                                                            name="add"><span className="btn-pr">Mua ngay</span></button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )

}

export default Product