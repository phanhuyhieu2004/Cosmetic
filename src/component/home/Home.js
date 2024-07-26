import "./Home.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
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
        <main className="main-content">
            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <img src="https://theme.hstatic.net/200000073977/1001213648/14/slide_3_img.jpg?v=793"
                             alt="Slide 1"/>
                    </div>
                    <div>
                        <img src="https://theme.hstatic.net/200000073977/1001213648/14/slide_4_img.jpg?v=793"
                             alt="Slide 2"/>
                    </div>
                    <div>
                        <img src="https://theme.hstatic.net/200000073977/1001213648/14/slide_2_img.jpg?v=793"
                             alt="Slide 3"/>
                    </div>
                    <div>
                        <img src="https://theme.hstatic.net/200000073977/1001213648/14/slide_1_img.jpg?v=793"
                             alt="Slide 4"/>
                    </div>

                </Slider>
            </div>
            <section className="product product-1">
                <div className="container container-product">
                    <div className="product-head">
                        <h2 className="title">TRANG ĐIỂM</h2>
                        <div className="list-product">
                            <ul className="nav product-menu">
                                <li className="product-item">
                                    <a className="nav-link active" href="#">
                                        SOM MÔI
                                    </a>
                                </li>
                                <li className="product-item">
                                    <a className="nav-link active" href="#">
                                        PHẤN NƯỚC
                                    </a>
                                </li>
                                <li className="product-item">
                                    <a className="nav-link active" href="#">
                                        MÁ HỒNG
                                    </a>
                                </li>
                                <li className="product-item">
                                    <a className="nav-link active" href="#">
                                        PHẤN PHỦ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="product-content">
                        <div className="product-list">
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
            <section className="product product-1">
                <div className="container container-product">
                    <div className="product-head">
                        <h2 className="title">CHĂM SÓC DA</h2>
                        <div className="list-product">
                            <ul className="nav product-menu">
                                <li className="product-item">
                                    <a className="nav-link active" href="#">
                                       CHĂM SÓC DA MẶT
                                    </a>
                                </li>
                                <li className="product-item">
                                    <a className="nav-link active" href="#">
                                       CHĂM SÓC DA CƠ THỂ
                                    </a>
                                </li>
                                <li className="product-item">
                                    <a className="nav-link active" href="#">
                                        KEM CHỐNG NẮNG
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="product-content">
                        <div className="product-list">
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-items">
                                <div className="product-image">
                                    <div className="image">
                                        <picture>
                                            <img className="img-load"
                                                 src="http://product.hstatic.net/200000073977/product/banner_web_sp_1000x1000px_4_lipgloss_tang_vi__recovered_-03_67f1e7ec239b4eb5801fae815aeb8d33_medium.jpg"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <h3 className="title-pr">
                                        <a className="quickview-product" href="/home">
                                            Son Thỏi Cao Cấp The New Iconic Phiên Bản Giới Hạn
                                        </a>
                                    </h3>
                                    <div className="proloop--variant">
                                        +1 Màu sắc
                                    </div>
                                    <div className="proloop--price">
                                        <div className="price-box">
                                            <span className="price">808,000₫</span>
                                        </div>
                                    </div>
                                    <div className="proloop-actions">
                                        <button className="btn-cart">
                                            <i className="fas fa-shopping-cart"/>

                                        </button>
                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
