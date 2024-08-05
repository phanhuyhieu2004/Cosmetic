import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";

function Home() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState({});
    const [images, setImages] = useState([]);
    const [variants, setVariants] = useState([]);
console.log(selectedSubcategories)
    useEffect(() => {
        axios.get('https://cosmeticbe-production.up.railway.app/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Lỗi không lấy được danh mục cha:', error));
    }, []);

    useEffect(() => {
        axios.get('https://cosmeticbe-production.up.railway.app/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Lỗi không lấy được sản phẩm:', error));
    }, []);

    useEffect(() => {
        axios.get('https://cosmeticbe-production.up.railway.app/api/images')
            .then(response => setImages(response.data))
            .catch(error => console.error('Lỗi không lấy được ảnh:', error));
    }, []);

    useEffect(() => {
        axios.get('https://cosmeticbe-production.up.railway.app/api/variants')
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
                    3:8
                };
                setSelectedSubcategories(defaultSubcategories);
            })
            .catch(error => console.error('Lỗi không lấy được danh mục con:', error));
    }, []);
console.log('id là ',selectedSubcategories);
    const handleSubcategoryClick = (subcategoryId, categoryId) => {
        setSelectedSubcategories(prev => ({
            ...prev,
            [categoryId]: subcategoryId
        }));
    };

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
                                                    {subcategory.name}
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
                                        .map(product => (
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
                                                    <div className="product--variant">
                                                        + {variants
                                                        .filter(variant =>
                                                            variant.products.id === product.id
                                                        ).length} Màu sắc
                                                    </div>
                                                    <div className="product--price">
                                                        <div className="price-box">
                                                            <span className="price">{product.price}.000₫</span>
                                                        </div>
                                                    </div>
                                                    <div className="product-actions">
                                                        <button className="btn-cart">
                                                            <i className="fas fa-shopping-cart"/>
                                                        </button>
                                                        <span className="btn-text">Thêm vào giỏ hàng</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                    </div>

                    <div className={`product-btn ${products.length>18?'active':''}`} >
                        {selectedSubcategories[category.id] && (
                            <Link
                                to={`/products/${selectedSubcategories[category.id]}`}
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
