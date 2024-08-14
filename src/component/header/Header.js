import "./Header.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Header() {
    // lưu id của danh mục hiện tại khi di chuột vào
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("người dung",user)// Lấy thông tin người dùng từ localStorage
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
        // thay đổi dựa vào việc người dùng di chuột sang danh mục khác
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


    return (
        <>
            <header>
                <div className="header-top">
                    <div className="logo">
                        <a href="/home">
                            <img
                                src="http://theme.hstatic.net/200000073977/1001213648/14/logo.png?v=791"
                                alt="Logo"
                                style={{minWidth: 120, maxWidth: 130}}
                            />
                        </a>
                    </div>
                    <div className="search-box">
                        <input type="text" placeholder="Tìm kiếm sản phẩm..."/>
                        <button className="search-btn">
                            <i className="fas fa-search"/>
                        </button>
                    </div>
                    <div className="nav-icons">
                        <a href="#" className="icon">
                            <i className="far fa-heart"/>
                            <span>Yêu thích</span>
                        </a>
                        <a href="/cart" className="icon">
                            <i className="fas fa-shopping-cart"/>
                            <span>Giỏ hàng</span>
                        </a>
                        {user ? (
                            <div className="dropdown">
            <span className="icon" onClick={toggleMenu}>
                <i className="fas fa-user"/>
                <span>
                    Xin chào, {user.name} <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
            </span>
                                {isOpen && (
                                    <div className="dropdown-menu">
                                        <a href="/orders">Đơn mua</a>
                                        <span onClick={handleLogout}>Đăng xuất</span>
                                    </div>
                                )}
                            </div>) : (<a href="/login" className="icon">
                                <i className="fas fa-user"/>
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
                                        // lấy được id của danh mục muốn hiển thị ra các mục con bằng cách di chuột vào mục đó
                                        onMouseEnter={() => handleMouseEnter(category.id)}
                                    >
                                        <a href="/home">
                                            {category.name}

                                            <i className="fa fa-chevron-down"></i>
                                        </a>
                                        {/*id của danh mục khi di chuột vào trùng với id của danh mục đang hiển thị thì nó sẽ lấy ra các mục con dưới dm đó*/}
                                        {hoveredCategoryId === category.id && (
                                            <ul className="menu-sub menu-list-lv1">
                                                {subCategories.map(subCategory => (
                                                    <li key={subCategory.id} className="sub-menu-lv2">
                                                        <Link
                                                            to={`/products/${subCategory.id}/${subCategory.name}`}>{subCategory.name}</Link>
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
                                <li className="sub-menu-lv1"><a href="/home">
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