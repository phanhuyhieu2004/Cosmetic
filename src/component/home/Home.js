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
        axios.get('http://localhost:8080/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Lỗi không lấy được danh mục cha:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => setProducts(response.data))
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
        axios.get('http://localhost:8080/api/subcategories')
            .then(response => {
                setSubCategories(response.data);

                const defaultSubcategories = {
                    3: 1,
                    4: 6,
                    5:11
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
                                                            <img
                                                                className="img-load"
                                                                src={images[0].find(image => image.products.id === product.id)?.name}
                                                                alt={images[0].find(image => image.products.id === product.id)?.name}
                                                            />
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
                </section>
            ))}
        </main>
    );
}

export default Home;
