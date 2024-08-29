import "./Header.css"
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('');

    const dropdownRef = useRef(null);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Không lấy được danh sách danh mục:', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        if (hoveredCategoryId) {
            axios.get(`http://localhost:8080/api/subcategories/${hoveredCategoryId}`)
                .then(response => {
                    setSubCategories(response.data);
                })
                .catch(error => {
                    console.error('Không lấy được danh sách danh mục con:', error);
                });
        }
    }, [hoveredCategoryId]);

    const handleMouseEnter = (categoryId) => {
        setHoveredCategoryId(categoryId);
    };

    const handleSearchChange = async (e) => {
        setSearch(e.target.value);
        if (e.target.value.length > 0) {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/product/search?name=${e.target.value}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Lỗi khi tìm kiếm:', error);
            }
        } else {
            setSearchResults([]); // Nếu không có từ khóa thì xóa kết quả tìm kiếm
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?name=${search}`);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/images')
            .then(response => setImages(response.data))
            .catch(error => console.error('Lỗi không lấy được ảnh:', error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Nếu dropdownRef.current không phải là null, nghĩa là phần tử này đã tồn tại trên trang.
            // dropdownRef.current.contains(event.target) là một cách để kiểm tra xem phần tử event.target (phần tử mà người dùng click vào) có nằm bên trong dropdownRef.current hay không.
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        // document.addEventListener("mousedown", handleClickOutside); sẽ gắn sự kiện mousedown vào toàn bộ tài liệu (tức là toàn bộ trang web). Khi người dùng nhấp chuột (mousedown), hàm handleClickOutside sẽ được gọi.
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header>
                <div className="header-top">
                    <div className="logo">
                        <a href="/home">
                            <img
                                src="http://theme.hstatic.net/200000073977/1001213648/14/logo.png?v=791"
                                alt="Logo"
                                style={{ minWidth: 120, maxWidth: 130 }}
                            />
                        </a>
                    </div>

                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <button className="search-btn" onClick={handleSearchSubmit}>
                            <i className="fas fa-search" />
                        </button>

                        <div
                            ref={dropdownRef}
                            className={`dropdown-search ${searchResults.length > 0 ? "search-smart" : ""}`}
                        >
                            <div className="resultsContent resultsdata">
                                {searchResults.length > 0 ? (
                                    searchResults.slice(0, 5).map(result => (
                                        <div key={result.id} className="item-ult">
                                            <div className="thumbs">
                                                <Link to={`/product/${result.id}`}>
                                                    {images.filter(image => image.products.id === result.id)[0] && (
                                                        <img
                                                            src={images.filter(image => image.products.id === result.id)[0].name}
                                                            alt={result.name}
                                                        />
                                                    )}
                                                </Link>
                                            </div>
                                            <div className="title-search">
                                                <Link to={`/product/${result.id}`}>{result.name}</Link>
                                                <p className="f-initial">
                                                    {((result.price) * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có sản phẩm nào</p>
                                )}
                            </div>
                            <div className="resultsMore">
                                <Link to={`/search?name=${search}`}>Xem thêm {searchResults.length} sản phẩm</Link>
                            </div>
                        </div>
                    </div>

                    <div className="nav-icons">
                        <a href="#" className="icon">
                            <i className="far fa-heart" />
                            <span>Yêu thích</span>
                        </a>
                        <a href="/cart" className="icon">
                            <i className="fas fa-shopping-cart" />
                            <span>Giỏ hàng</span>
                        </a>
                        {user ? (
                            <div className="dropdown">
                                <span className="icon" onClick={toggleMenu}>
                                    <i className="fas fa-user" />
                                    <span>
                                        Xin chào, {user.name} <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </span>
                                {isOpen && (
                                    <div className="dropdown-menu">
                                        {user && user.role === 1 ? (

                                                <a href="/orders">Đơn mua</a>
                                        ) : ('')}

                                        {user && user.role === 0 ? (
                                            <a href="/list">Quản lý sản phẩm</a>
                                        ) : ('')}

                                        <span onClick={handleLogout}>Đăng xuất</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="/login" className="icon">
                                <i className="fas fa-user" />
                                <span>Đăng nhập / Đăng ký</span>
                            </a>
                        )}
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="container">
                        <nav className="main-menu">
                            <ul className="menu-list">
                                {categories.map(category => (
                                    <li
                                        key={category.id}
                                        className="sub-menu-lv1"
                                        onMouseEnter={() => handleMouseEnter(category.id)}
                                    >
                                        <a href="/home">
                                            {category.name}

                                            <i className="fa fa-chevron-down"></i>
                                        </a>
                                        {hoveredCategoryId === category.id && (
                                            <ul className="menu-sub menu-list-lv1">
                                                {subCategories.map(subCategory => (
                                                    <li key={subCategory.id} className="sub-menu-lv2">
                                                        <Link
                                                            to={`/products/${subCategory.id}/${subCategory.name}`}
                                                        >
                                                            {subCategory.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                                <li className="sub-menu-lv1"><a href="/home">
                                    HỆ THỐNG ĐẠI LÝ <span></span>
                                </a></li>
                                <li className="sub-menu-lv1"><a href="/home">
                                    HỆ THỐNG CHUỖI CỬA HÀNG
                                    <span></span>
                                </a></li>
                                <li className="sub-menu-lv1"><a href="/map">
                                    LIÊN HỆ
                                    <span></span>
                                </a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
