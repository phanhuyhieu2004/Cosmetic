import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Dialog} from "@mui/material";

function Searchs() {
    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [searchTerm,setSearchTerm]=useState('');
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const [currenIndex, setCurrenIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [hasVariants, setHasVariants] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
    };



    const handleThumbnailClick = (index) => setCurrenIndex(index);

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
    function searchProduct() {
    // khởi tạo một đối tượng URLSearchParams với chuỗi truy vấn từ location.search
    const queryParams = new URLSearchParams(location.search);
    // sử dụng phương thức .get() của URLSearchParams để lấy giá trị của tham số truy vấn name.
    const searchTerm = queryParams.get('name');
    console.log("Tìm kiếm với từ khóa:", searchTerm);
setSearchTerm(searchTerm);
    if (searchTerm) {
        axios.get(`http://localhost:8080/api/products/product/search?name=${searchTerm}`)
            .then(response => {
                setResults(response.data);
                console.log('Kết quả tìm kiếm:', response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu tìm kiếm:', error);
            });
    }

}
    useEffect(() => {
        // Xử lý tìm kiếm sản phẩm
     searchProduct();
    }, [location.search]);
    const handleIncrease = () => setQuantity((prevQuantity) => Math.min(prevQuantity + 1, selectedProduct.quantity));
    const handleDecrease = () => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    useEffect(() => {
        // Lấy dữ liệu các biến thể sản phẩm
        axios.get('http://localhost:8080/api/variants')
            .then(response => setVariants(response.data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu biến thể:', error));
    }, []);

    useEffect(() => {
        // Lấy dữ liệu hình ảnh sản phẩm
        axios.get('http://localhost:8080/api/images')
            .then(response => setImages(response.data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu hình ảnh:', error));
    }, []);

    const addToCart = async () => {
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            return;
        }
        if (hasVariants && !selectedVariant) {
            alert("Vui lòng chọn một biến thể.");
            return;
        }

        if (selectedProduct.quantity <= 0) {
            alert("Sản phẩm đã hết hàng.");
            return;
        }

        const variantId = hasVariants ? selectedVariant?.id : null;
        console.log("các biến thể la la ",variantId);
        try {
            await axios.post('http://localhost:8080/api/cart/add', null, {
                params: {
                    accountId: user.id,
                    productId: selectedProduct.id,
                    variantId: variantId,
                    quantity: quantity
                }
            });
            alert("Sản phẩm đã được thêm vào giỏ hàng");
        } catch (error) {
            console.error("Bạn cần đăng nhập để thêm sp vào giỏ hàng", error);
            alert("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
        }
    };


    return (
        <main className="main-content">
            <div className="layout-productDetail">
                <div className="breadcrumb-shop">
                    <div className="container container-pd1">
                        <div className="breadcrumb-list">
                            <ol className="breadcrumb breadcrumb-arrows">
                                <li><a href="/home"><span>Trang chủ</span></a></li>
                                <li><a href="/home"><span style={{ textTransform: "uppercase", fontWeight: "600" }}>b</span></a></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <section className="product product-1">
                    <div className="container container-product">
                        <div className="product-head">
                            <h2 className="title">Kết quả tìm kiếm cho "{searchTerm}"</h2>
                        </div>
                        <div className="product-content-1">
                            <div className="list product-list-1">
                                {results.map(product =>
                                    (

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
                                                <Link className="quickview-product" to={`/product/${product.id}`}>
                                                    {product.name}
                                                </Link>
                                            </h3>
                                            {variants.filter(variant => variant.products.id === product.id).length!=0 &&
                                            <div className="product--variant">
                                                + {variants.filter(variant => variant.products.id === product.id).length} Màu sắc
                                            </div>}
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
                                    </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
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
                                        {hasVariants ? (
                                            <div className="product--variants">
                                                <form>
                                                    <div
                                                        className="select-swatch clearfix">
                                                        <div
                                                            className="swatch clearfix">
                                                            <div
                                                                className="title-swap header">
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
                                        ) : (<div className="no-variants">
                                                <p>Sản phẩm này không có loại
                                                    nào.</p>
                                            </div>
                                        )}
                                        <div className="quantity-area">
                                            <div className="quantity-title">
                                                Số lượng : Đang
                                                có {selectedProduct.quantity} sản phẩm trong
                                                kho
                                            </div>
                                            <div className="box-quantity">
                                                <button type="button"
                                                        className="btn-quantity"
                                                        onClick={handleDecrease}
                                                        disabled={quantity <= 1}>
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
                                                       max={selectedProduct.quantity}
                                                       readOnly/>
                                                <button type="button"
                                                        className="btn-quantity"
                                                        disabled={quantity >= selectedProduct.quantity}
                                                        onClick={handleIncrease}>
                                                    <svg focusable="false"
                                                         className="icon icon--plus"
                                                         viewBox="0 0 10 10"
                                                         role="presentation">
                                                        <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="addCart-area">
                                                <button
                                                    className={`btn-addtocart ${selectedProduct?.quantity <= 0 ? "disable" : "enable"}`}
                                                    onClick={addToCart}
                                                    disabled={selectedProduct?.quantity <= 0}>
                                                    <span>{selectedProduct?.quantity > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}</span>
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
        </main>
    );
}

export default Searchs;
