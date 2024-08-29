import "./Product.css";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";

function Product() {
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [slides, setSlides] = useState([]);
    // Chỉ số của ảnh hiện tại đang được hiển thị trong trình xem ảnh
    const [currenIndex, setCurrenIndex] = useState(0);
    const [variants, setVariants] = useState([]);
    // đối tượng biến thể được chọn
    const [selectedVariant, setSelectedVariant] = useState(null);
    // check liệu sp có biến thể không?
    const [hasVariants, setHasVariants] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleIncrease = () => setQuantity((prevQuantity) => Math.min(prevQuantity + 1, product.quantity));
    const handleDecrease = () => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    const handleVariantClick = (variant) => setSelectedVariant(variant);
    console.log("biến thể được chọn ", selectedVariant)
// chỉ số của slide đằng trước luôn bằng hoặc lon hơn chỉ số của slide đầu tiên là chỉ số 0
    const prevSlide = () => setCurrenIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    // không được để chỉ số của slide tiếp theo vượt qua chỉ số của slide cuoi
    const nextSlide = () => setCurrenIndex((prevIndex) => Math.min(prevIndex + 1, slides.length - 1));
    const handleThumbnailClick = (index) => setCurrenIndex(index);

    const addToCart = async () => {
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            return;
        }
        if (hasVariants && !selectedVariant) {
            alert("Vui lòng chọn một biến thể.");
            return;
        }

        if (product.quantity <= 0) {
            alert("Sản phẩm đã hết hàng.");
            return;
        }

        const variantId = hasVariants ? selectedVariant?.id : null;
console.log("các biến thể la la ",variantId);
        try {
            await axios.post('http://localhost:8080/api/cart/add', null, {
                params: {
                    accountId: user.id,
                    productId: product.id,
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
    const buyNow = async () => {
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để mua hàng.");
            return;
        }
        if (hasVariants && !selectedVariant) {
            alert("Vui lòng chọn một biến thể.");
            return;
        }

        if (product.quantity <= 1) {
            alert("Sản phẩm đã hết hàng.");
            return;
        }

        const variantId = hasVariants ? selectedVariant?.id : null;

        try {
            await axios.post('http://localhost:8080/api/cart/add', null, {
                params: {
                    accountId: user.id,
                    productId: product.id,
                    variantId: variantId,
                    quantity: quantity
                }
                // params: Đây là một đối tượng chứa các cặp key-value, mà khi được truyền vào yêu cầu, sẽ tự động được chuyển đổi thành chuỗi query và gắn vào cuối URL.
            });
            alert("Sản phẩm đã được thêm vào giỏ hàng");
            navigate("/cart");
        } catch (error) {
            console.error("Bạn cần đăng nhập để mua sp :", error);
            alert("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
        }
    };
    useEffect(() => {
        axios.get('http://localhost:8080/api/variants')
            .then(response => {
                const variantsData = response.data;
                setVariants(variantsData);
                // Kiểm tra xem có ít nhất một biến thể trong variantsData mà thuộc tính products.id của nó khớp với product.id không.
                const productHasVariants = variantsData.some(variant => variant.products.id === product.id);
                setHasVariants(productHasVariants);

            })
            .catch(error => console.error('Lỗi không lấy được biến thể:', error));
    }, [product]);
    console.log("Yes/No", hasVariants)
    useEffect(() => {
        axios.get(`http://localhost:8080/api/images/${id}`)
            .then(response => setSlides(response.data))
            .catch(error => console.error('Lỗi không lấy được ảnh:', error));
    }, [id]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Lỗi không lấy được sản phẩm:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className="main-content">
                <div className="layout-productDetail">
                    <div className="breadcrumb-shop">
                        <div className="container container-pd1">
                            <div className="breadcrumb-list">
                                <ol className="breadcrumb breadcrumb-arrows">
                                    <li><a href="/home"><span>Trang chủ</span></a></li>
                                    <li><a href="/home"><span>{product && product.subcategories.name}</span></a></li>
                                    <li><a href="/home"><span>{product && product.name}</span></a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <section className="productDetail-information">
                        <div className="container container-pd2">
                            <div className="productDetail--gallery">
                                <div className="wrapbox-gallery">
                                    <div className="wrapbox-image">
                                        <div className="productGallery_thumb">
                                            <ul className="productSlick-thumb slick-slider">
                                                <div className="slick-list draggable" style={{height: "fit-content"}}>
                                                    <div className="slick-track">
                                                        {slides.map((slide, index) => (
                                                            <li key={index} className="slick-slide">
                                                                <img
                                                                    src={slide.name}
                                                                    alt={`Thumbnail ${index + 1}`}
                                                                    className={`product-thumb__item ${currenIndex === index ? 'active' : ''}`}
                                                                    // lấy được chỉ số của ảnh thu nhỏ
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
                                                src={slides[currenIndex]?.name || ''}
                                                // dựa vào chỉ số để tìm obj ở chỉ số đó trong mảng và lấy ra tên của obj đó
                                                className="slide-image"
                                                alt="Không có ảnh"
                                            />
                                            <button
                                                className={`nav-button next-button ${currenIndex === slides.length - 1 ? 'hidden' : ''}`}
                                                onClick={nextSlide}
                                            >
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="productDetailjs productDetail--content">
                                <div className="wrapbox-detail">
                                    <div className="product-heading">
                                        <h1>{product?.name}</h1>
                                    </div>
                                    <div className="product--price">
                                        <span className="price-real">{product?.price},000₫</span>
                                    </div>
                                    {hasVariants ? (
                                        <div className="product--variants">
                                            <form>
                                                <div className="select-swatch clearfix">
                                                    <div className="swatch clearfix">
                                                        <div className="title-swap header">
                                                            <p>Màu sắc :</p>
                                                            <strong>{selectedVariant ? selectedVariant.name : 'Chọn màu'}</strong>
                                                        </div>
                                                        <div className="select-swap">
                                                            {variants
                                                                .filter(variant => variant.products.id === product.id)
                                                                .map(variant => (
                                                                    <div
                                                                        className={`swatch-element`}
                                                                        key={variant.id}
                                                                        onClick={() => handleVariantClick(variant)}

                                                                    >
                                                                        {/*biến thể được chonj truyền vào haàm */}
                                                                        <label
                                                                            className={`variant ${selectedVariant?.id === variant.id ? 'sd' : ''}`}
                                                                        >
                                                                            <span>{variant.name}</span>
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="no-variants">
                                            <p>Sản phẩm này không có loại nào.</p>
                                        </div>
                                    )}
                                    <div className="quantity-area">
                                        <div className="quantity-title">
                                            Số lượng : Đang có {product.quantity} sản phẩm trong kho
                                        </div>
                                        <div className="box-quantity">
                                            <button type="button" className="btn-quantity" onClick={handleDecrease}                 disabled={quantity <= 1}>
                                                <svg focusable="false" className="icon icon--minus" viewBox="0 0 10 2"
                                                     role="presentation">
                                                    <path d="M10 0v2H0V0z"></path>
                                                </svg>
                                            </button>
                                            <input type="text" className="quantity-input" value={quantity} min={1}
                                                   max={product.quantity} readOnly/>
                                            <button type="button" className="btn-quantity"                 disabled={quantity >= product.quantity} onClick={handleIncrease}>
                                                <svg focusable="false" className="icon icon--plus" viewBox="0 0 10 10"
                                                     role="presentation">
                                                    <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="addCart-area">
                                            <button
                                                className={`btn-addtocart ${product?.quantity <= 0 ? "disable" : "enable"}`}
                                                onClick={addToCart}
                                                disabled={product?.quantity <= 0}>
                                                <span>{product?.quantity > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="addCart-area">
                                        <button className={`buy-now ${product?.quantity <= 0 ? "disable" : "enable"}`}
                                                onClick={buyNow}>
                                            <span>{product?.quantity > 0 ? "MUA NGAY" : "HẾT HÀNG"}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-decription">
                            <div className="container">
                                <div className="product-info">
                                    <div className="nav tab-title">
                                        <span className="title-product active">Mô tả sản phẩm</span>
                                    </div>
                                    <div className="nav-tabContent">
                                        <div className="product-content">

                                            <ReactQuill
                                                value={product?.description}
                                                readOnly={true}
                                                theme={"bubble"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Product;
