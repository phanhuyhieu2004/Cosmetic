import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function Products() {

    const {id, name} = useParams();
    const [products, setProducts] = useState([]);
    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error("Lỗi không lấy được sản phẩm :", error.message));
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/variants')
            .then(response => setVariants(response.data))
            .catch(error => console.error('Lỗi không lấy được biến thể:', error));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/images`)
            .then(response => setImages(response.data))
            .catch(error => console.error('Lỗi không lấy được ảnh:', error));
    }, [id]);
    return (
        <>
            <main className="main-content">
                <div className="layout-productDetail">
                    <div className="breadcrumb-shop">
                        <div className="container container-pd1">
                            <div className="breadcrumb-list">
                                <ol className="breadcrumb breadcrumb-arrows">
                                    <li><a href="/home"><span>Trang chủ</span></a></li>
                                    <li><a href="/home"><span style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600"
                                    }}>{name}</span></a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <section className="product product-1">
                        <div className="container container-product">
                            <div className="product-head">
                                <h2 className="title">{name}</h2>

                            </div>
                            <div className="product-content-1">
                                <div className="list product-list-1">
                                    {products.map(product => (
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

                        </div>


                    </section>

                </div>
            </main>
        </>
    )
}

export default Products;