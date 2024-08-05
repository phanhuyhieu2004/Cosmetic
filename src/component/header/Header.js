import "./Header.css"
import React, {useEffect, useState} from "react";
import axios from "axios";

function Header() {
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    useEffect(() => {
        axios.get('https://cosmeticbe-production.up.railway.app/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Không lấy được danh sách danh mục:', error);
            });
    }, []);

    useEffect(() => {
        if (hoveredCategoryId) {
            axios.get(`https://cosmeticbe-production.up.railway.app/api/subcategories/${hoveredCategoryId}`)
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
                        <a href="#" className="icon">
                            <i className="fas fa-shopping-cart"/>
                            <span>Giỏ hàng</span>
                        </a>
                        <a href="/login" className="icon">
                            <i className="fas fa-user"/>
                            <span>Đăng nhập / Đăng ký</span>
                        </a>
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
                                                        <a href="#">{subCategory.name}</a>
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
                                    ĐĂNG KÝ KINH DOANH
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