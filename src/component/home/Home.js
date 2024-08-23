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
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [productCountBySubcategory, setProductCountBySubcategory] = useState({});
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
// duyệt qua từng sản phẩm,sum là đối tượng chứa số lượng sản phẩm trong từng danh mục con
                const countBySubcategory = response.data.reduce((sum, product) => {
                    const subcategoryId = product.subcategories.id;
                    console.log("id danh mục con từ mỗi sp",subcategoryId)
                    //Kiểm tra xem id danh mục con đã có ở trong sum chưa,nếu chưa có thì thêm id đó vào với GTKT là 0
                    if (!sum[subcategoryId]) {
                        sum[subcategoryId] = 0;
                    }
                    //Sau đó tăng lên 1
                    sum[subcategoryId] += 1;
                    return sum;
                }, {});
                // {} giá trị khởi tạo cho sum,đây là đối tượng trống sd lưu sl sp cho từng danh mục con
                setProductCountBySubcategory(countBySubcategory);
            })
            .catch(error => console.error('Lỗi không lấy được sản phẩm:', error));
    }, []);
console.log("số lượng sp trong từng dm là ",productCountBySubcategory)
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
        axios.get('http://localhost:8080/api/subcategories')
            .then(response => {
                setSubCategories(response.data);

                const defaultSubcategories = {
                    1: 1,
                    2: 5,
                    3: 9
                    // Đây chính là các thuộc tính với giá trị tương ứng trong đối tượng này
                };
                // Tạo một đối tượng defaultSubcategories với các giá trị mặc định. Đây là một đối tượng ánh xạ ID của các danh mục chính đến ID của các danh mục con. Ví dụ, danh mục chính với ID 1 có danh mục con với ID 1, danh mục chính với ID 2 có danh mục con với ID 4, và danh mục chính với ID 3 có danh mục con với ID 8
                setSelectedSubcategories(defaultSubcategories);
            })
            .catch(error => console.error('Lỗi không lấy được danh mục con:', error));
    }, []);

// xử lý khi người dùng bấm vào các danh mục con khác thì sẽ lấy được id của danh mục cha,con đó
    const handleSubcategoryClick = (subcategoryId, categoryId) => {
        // tự động truyền giá trị hiện tại của trạng thái vào tham số=) prev đang chứa giá trị hiện tại trước khi thay đổi
        setSelectedSubcategories(prev => ({
            // sao chép giá trị hiện tại vào đối tượng mới
            ...prev,
            // khi chon danh mục chính,con thì thuộc tính trong đối tượng cũng sẽ thay đổi
            [categoryId]: subcategoryId
        }));
    };

    // Thiết lập các thuộc tính trong slide
    const settings = {
        // ô điều hướng
        dots: true,
        // hiển thị slide
        slidesToShow: 1,
        // số phần tử được lướt sang
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };
    console.log("GTMD",selectedSubcategories);
console.log("DMC",subCategories);
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
                                        //  filter được sử dụng để lọc danh sách subCategories,
                                        //  chỉ giữ lại các danh mục con thuộc về danh mục cha  mà có ID trùng với category.id.
                                        .filter(subcategory => subcategory.categories.id === category.id)
                                        .map(subcategory => (
                                            <li key={subcategory.id} className="product-item">
                                                <a
                                                    className={`nav-link ${selectedSubcategories[category.id] === subcategory.id ? 'active' : ''}`}
                                                    // selectedSubcategories[category.id] lấy giá trị của danh mục con đã chọn cho danh mục chính để so sánh vơi id của danh mục con hiện tại trong vòng lặp.
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSubcategoryClick(subcategory.id, category.id);
                                                        // lấy được id danh mục cha,con thì sẽ truyền vào hàm để đưa vào state selectedSubcategories,sau đó thì nó sẽ cập nhật lại
                                                    }}
                                                >
                                                    {/*lấy được số lượng sản phẩm thông qua việc truy cập vào đối tượng productCountBySubcategory từ key*/}
                                                    {subcategory.name} ({productCountBySubcategory[subcategory.id] || 0})                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        {/*kiểm tra xem có danh mục con được chọn hay không,nếu có thì sẽ hiển thị các sản phẩm thuộc danh mục con đó*/}
                        {(selectedSubcategories[category.id]) && (
                            <div className="product-content-1">
                                <div className="list product-list-1">
                                    {products
                                        .filter(product =>
                                            product.subcategories.id === selectedSubcategories[category.id]
                                            // Lọc sản phẩm theo mục con đã chọn,có thể nói đây là so sánh xem id của danh mục con đã chọn có bằng id của danh mục con trong sản phẩm hay không?nếu có thì lấy ra sản phẩm thuộc danh mục con đó
                                        )
                                        .slice(0, 18)
                                        // Lấy ra 18 sản phẩm thuộc danh mục con đó,không hơn không kém
                                        .map(product => {
                                            // Lọc các biến thể cho sản phẩm cụ thể bằng cách so sánh id của sản phẩm trong bảng bến thể có trùng với id của sản phẩm trong vòng lặp không?nếu có thì sẽ lấy ra được các biến thể của sản phấm đó
                                            const productVariants = variants.filter(variant =>
                                                variant.products.id === product.id
                                            );

                                            return (
                                                <div key={product.id} className="product-items">
                                                    <div className="product-image">
                                                        <div className="image">
                                                            <picture>
                                                                {/*Kiểm tra ảnh vơới điều kiện id của sản phẩm trong baảng ảnh phải trùng với id sản phẩm,nếu có ảnh thì sẽ lấy ra được ảnh ở vị trí đầu tiên của sp */}
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
                        {/*id của dm con và số lượng sp của dm con phải lớn hơn 18 sp thì mới hien thị nut*/}
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
