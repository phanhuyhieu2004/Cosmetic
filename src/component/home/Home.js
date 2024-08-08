import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import {Dialog} from "@mui/material";

function Home() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState({});
    const [images, setImages] = useState([]);
    const [variants, setVariants] = useState([]);
    const [productCountBySubcategory, setProductCountBySubcategory] = useState({}); // Trạng thái lưu số lượng sản phẩm
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const [currenIndex, setCurrenIndex] = useState(0);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
    };

    const handleDecrease = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1);
    };

    const handleThumbnailClick = (index) => setCurrenIndex(index);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openSettingModal, setOpenSettingModal] = useState(false);
    const prevSlide = () => {
        setCurrenIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const nextSlide = () => {
        setCurrenIndex((prevIndex) => Math.min(prevIndex + 1, productImages.length - 1));
    };

    const productImages = selectedProduct ? images.filter(image => image.products.id === selectedProduct.id) : [];

    const handleSettingClick = (product) => {
        setSelectedProduct(product);
        setCurrenIndex(0); // Reset chỉ số slider khi chọn sản phẩm mới
        setOpenSettingModal(true);
    };

    const handleCloseSettingModal = () => {
        setOpenSettingModal(false);
        setSelectedProduct(null);
    };
    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Lỗi không lấy được danh mục cha:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);

                // Tính số lượng sản phẩm cho mỗi danh mục con
                const countBySubcategory = response.data.reduce((acc, product) => {
                    const subcategoryId = product.subcategories.id;
                    if (!acc[subcategoryId]) {
                        acc[subcategoryId] = 0;
                    }
                    acc[subcategoryId] += 1;
                    return acc;
                }, {});
                setProductCountBySubcategory(countBySubcategory);
            })
            .catch(error => console.error('Lỗi không lấy được sản phẩm:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/images')
            .then(response => setImages(response.data))
            .catch(error => console.error('Lỗi không lấy được ảnh:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/variants')
            .then(response => setVariants(response.data))
            .catch(error => console.error('Lỗi không lấy được biến thể:', error));
    }, []);

    useEffect(() => {
        axios.get('https://cosmeticbe-production.up.railway.app/api/subcategories')
            .then(response => {
                setSubCategories(response.data);

                const defaultSubcategories = {
                    1: 1,
                    2: 4,
                    3: 8
                };
                setSelectedSubcategories(defaultSubcategories);
            })
            .catch(error => console.error('Lỗi không lấy được danh mục con:', error));
    }, []);

    const handleSubcategoryClick = (subcategoryId, categoryId) => {
        setSelectedSubcategories(prev => ({
            ...prev,
            [categoryId]: subcategoryId
        }));
    };
    console.log("danh mục con", subCategories);
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
            {categories.map(category => (
                <section className="product product-1" key={category.id}>
                    <div className="container container-product">
                        <div className="product-head">
                            <h2 className="title">{category.name}</h2>
                            <div className="list-product">
                                <ul className="nav product-menu">
                                    {subCategories
                                        .filter(subcategory => subcategory.categories.id === category.id)
                                        .map(subcategory => (
                                            <li key={subcategory.id} className="product-item">
                                                <a
                                                    className={`nav-link ${selectedSubcategories[category.id] === subcategory.id ? 'active' : ''}`}
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSubcategoryClick(subcategory.id, category.id);
                                                    }}
                                                >
                                                    {subcategory.name} ({productCountBySubcategory[subcategory.id] || 0})
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        {(selectedSubcategories[category.id]) && (
                            <div className="product-content-1">
                                <div className="list product-list-1">
                                    {products
                                        .filter(product =>
                                            product.subcategories.id === selectedSubcategories[category.id] // Lọc sản phẩm theo mục con đã chọn
                                        )
                                        .slice(0, 18)
                                        .map(product => {
                                            // Lọc các biến thể cho sản phẩm cụ thể
                                            const productVariants = variants.filter(variant =>
                                                variant.products.id === product.id
                                            );

                                            return (
                                                <div key={product.id} className="product-items">
                                                    <div className="product-image">
                                                        <div className="image">
                                                            <picture>
                                                                {images.filter(image => image.products.id === product.id)[0] && (
                                                                    <img
                                                                        className="img-load"
                                                                        src={images.filter(image => image.products.id === product.id)[0].name}
                                                                        alt={images.filter(image => image.products.id === product.id)[0].name}
                                                                    />
                                                                )}
                                                            </picture>
                                                        </div>
                                                    </div>
                                                    <div className="product-detail">
                                                        <h3 className="title-pr">
                                                            <Link className="quickview-product"
                                                                  to={`/product/${product.id}`}>
                                                                {product.name}
                                                            </Link>
                                                        </h3>

                                                        {productVariants.length > 0 && (
                                                            <div className="product--variant">
                                                                + {productVariants.length} Màu sắc
                                                            </div>
                                                        )}
                                                        <div className="product--price">
                                                            <div className="price-box">
                                                                <span className="price">{product.price}.000₫</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-actions">
                                                            <button className="btn-cart"
                                                                    onClick={() => handleSettingClick(product)}><i
                                                                className="fas fa-shopping-cart"/>
                                                            </button>
                                                            <span className="btn-text">Thêm vào giỏ hàng</span>
                                                        </div>
                                                    </div>
                                                    <Dialog open={openSettingModal} onClose={handleCloseSettingModal}
                                                            style={{width: 'fit-content'}}>
                                                        {selectedProduct && (
                                                            <section className="productDetail-information modal">

                                                                <div className="container container-pd2 modal">
                                                                    <div className="productDetail--gallery modal">
                                                                        <div className="wrapbox-gallery modal">
                                                                            <div className="wrapbox-image modal">
                                                                                <div className="productGallery_thumb">
                                                                                    <ul className="productSlick-thumb slick-slider">
                                                                                        <div
                                                                                            className="slick-list draggable"
                                                                                            style={{height: "fit-content"}}>
                                                                                            <div
                                                                                                className="slick-track">
                                                                                                {images
                                                                                                    .filter(image => image.products.id === selectedProduct.id)
                                                                                                    .map((image, index) => (
                                                                                                        <li key={index}
                                                                                                            className="slick-slide">
                                                                                                            <img
                                                                                                                src={image.name}
                                                                                                                alt={`Thumbnail ${index + 1}`}
                                                                                                                className={`product-thumb__item ${currenIndex === index ? 'active' : ''}`}
                                                                                                                onClick={() => handleThumbnailClick(index)}
                                                                                                            />
                                                                                                        </li>
                                                                                                    ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </ul>
                                                                                </div>
                                                                                <div className="productGallery_slider">
                                                                                    <button
                                                                                        className={`nav-button prev-button ${currenIndex === 0 ? 'hidden' : ''}`}
                                                                                        onClick={prevSlide}
                                                                                    >
                                                                                        <i className="fa-solid fa-arrow-left"></i>
                                                                                    </button>
                                                                                    <img
                                                                                        src={productImages[currenIndex]?.name || ''}
                                                                                        className="slide-image"
                                                                                        alt="Không có ảnh"
                                                                                    />
                                                                                    <button
                                                                                        className={`nav-button next-button ${currenIndex === productImages.length - 1 ? 'hidden' : ''}`}
                                                                                        onClick={nextSlide}
                                                                                    >
                                                                                        <i className="fa-solid fa-arrow-right"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="productDetailjs productDetail--content modal">
                                                                        <div className="wrapbox-detail modal">
                                                                            <div className="product-heading">
                                                                                <h1>{selectedProduct.name}</h1>
                                                                            </div>
                                                                            <div className="product--price">
                                                                                <span
                                                                                    className="price-real">{selectedProduct.price},000₫</span>
                                                                            </div>
                                                                            <div className="product--variants">
                                                                                <form>
                                                                                    <div className="select-swatch clearfix">
                                                                                        <div
                                                                                            className="swatch clearfix">
                                                                                            <div className="title-swap header">
                                                                                                <p>Màu sắc :</p>
                                                                                                <strong>{selectedVariant ? selectedVariant.name : 'Chọn màu'}</strong>
                                                                                            </div>
                                                                                            <div
                                                                                                className="select-swap">
                                                                                                {variants
                                                                                                    .filter(variant => variant.products.id === selectedProduct.id)
                                                                                                    .map(variant => (
                                                                                                        <div
                                                                                                            className={`swatch-element `}
                                                                                                            key={variant.id}
                                                                                                            onClick={() => handleVariantClick(variant)}
                                                                                                        >
                                                                                                            <label
                                                                                                                className={`variant ${selectedVariant?.id === variant.id ? 'sd' : ''}`}>
                                                                                                                <span>{variant.name}</span>
                                                                                                            </label>
                                                                                                        </div>
                                                                                                    ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            </div>

                                                                            <div className="quantity-area">
                                                                                <div className="quantity-title">
                                                                                    Số lượng :
                                                                                </div>
                                                                                <div className="box-quantity">
                                                                                    <button type="button"
                                                                                            className="btn-quantity"
                                                                                            onClick={handleDecrease}>
                                                                                        <svg focusable="false"
                                                                                             className="icon icon--minus"
                                                                                             viewBox="0 0 10 2"
                                                                                             role="presentation">
                                                                                            <path
                                                                                                d="M10 0v2H0V0z"></path>
                                                                                        </svg>
                                                                                    </button>
                                                                                    <input type="text"
                                                                                           className="quantity-input"
                                                                                           value={quantity} min={1}
                                                                                           readOnly/>
                                                                                    <button type="button"
                                                                                            className="btn-quantity"
                                                                                            onClick={handleIncrease}>
                                                                                        <svg focusable="false"
                                                                                             className="icon icon--plus"
                                                                                             viewBox="0 0 10 10"
                                                                                             role="presentation">
                                                                                            <path d="M5 0v10M0 5h10"
                                                                                                  stroke="currentColor"></path>
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                                <div className="addCart-area">
                                                                                    <button className="btn-addtocart">
                                                                                        <span>THÊM VÀO GIỎ</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        )}
                                                    </Dialog>

                                                </div>

                                            );
                                        })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={`product-btn ${productCountBySubcategory[selectedSubcategories[category.id]] > 18 ? 'active' : ''}`}>
                        {selectedSubcategories[category.id] && productCountBySubcategory[selectedSubcategories[category.id]] > 18 && (
                            <Link
                                to={`/products/${selectedSubcategories[category.id]}/${encodeURIComponent(subCategories[`${selectedSubcategories[category.id] - 1}`].name)}`}
                                className="button load-more"
                            >
                                Xem thêm
                            </Link>
                        )}
                    </div>
                </section>
            ))}
        </main>
    );
}

export default Home;
