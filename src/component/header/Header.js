import "./Header.css"
import React from "react";
function Header() {
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
                        <a href="#" className="icon">
                            <i className="fas fa-user"/>
                            <span>Đăng nhập / Đăng ký</span>
                        </a>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="container">
                        <nav className="main-menu">
                            <ul className="menu-list">
                                <li class="sub-menu-lv1"><a href="/home">
                                 TRANG ĐIỂM
                                    <span className="tag">NEW</span>
                                    <i class="fa fa-chevron-down"></i>
                                </a>
                                    <ul className="menu-sub menu-list-lv1">
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a>
                                            <ul className="menu-sub menu-list-lv2">
                                                <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>


                                            </ul>
                                        </li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                    </ul>
                                </li> <li class="sub-menu-lv1"><a href="/home">
                                    CHĂM SÓC DA
                                    <span className="tag">NEW</span>
                                    <i class="fa fa-chevron-down"></i>
                                </a>
                                    <ul className="menu-sub menu-list-lv1">
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a>
                                            <ul className="menu-sub menu-list-lv2">
                                                <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>
                                                    <li><a href="/home">Son Bóng</a>

                                                </li>


                                            </ul>
                                        </li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                        <li className="sub-menu-lv2"><a href="">SON MÔI
                                            <i className="fa fa-chevron-right"></i></a></li>
                                    </ul>
                                </li>
                                <li class="sub-menu-lv1"><a href="/home">
ƯU ĐÃI                                    <span></span>
                                    <i class="fa fa-chevron-down"></i>
                                </a></li>
                                <li class="sub-menu-lv1"><a href="/home">
HỆ THỐNG ĐẠI LÝ                                   <span></span>
                                    <i class="fa fa-chevron-down"></i>
                                </a></li>
                                <li class="sub-menu-lv1"><a href="/home">
                                    HỆ THỐNG CHUỖI CỬA HÀNG
                                    <span></span>
                                    <i class="fa fa-chevron-down"></i>
                                </a></li>
                                <li class="sub-menu-lv1"><a href="/home">
                                    ĐĂNG KÝ KINH DOANH
                                    <span></span>
                                    <i class="fa fa-chevron-down"></i>
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