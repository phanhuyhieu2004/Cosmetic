import {Link} from "react-router-dom";
import React from "react";

function Dashboard() {
    const user=JSON.parse(localStorage.getItem('user'))
    return(
        <>
            <div className="form-bar">
                <div className="clearfix">
                    <img
                        src="https://static-00.iconduck.com/assets.00/cs-cat-admin-icon-512x512-3l4exe6y.png"
                        className="avatar" alt="không thể xem ảnh"/>
                    <div className="info-text">
                        <div className="fullname">
                            <span>{user.name}</span>
                        </div>
                    </div>
                </div>
                <ul className="action">
                    <li>
                        <Link to="/home">
                            <i className="fa fa-book-open-reader"></i>Trang chủ
                        </Link>
                    </li>
                    {user && user.role === 0 ? (

                        <li>
                            <Link to="/list">
                                <i className="fa fa-bars"/> Danh sách sản phẩm
                            </Link>
                        </li>) : ('')
                    }
                    {user && user.role === 0 ? (

                        <li>
                            <Link to="/create">
                                <i className="fa fa-plus"></i> Thêm sản phẩm
                            </Link>
                        </li>
                    ) : ('')
                    }
                    {user && user.role === 0 ? (

                        <li>
                            <Link to="/statistical">
                                <i className=" fa fa-chart-simple"></i> Thống kê
                            </Link>
                        </li>
                    ) : ('')
                    } {user && user.role === 0 ? (

                    <li>
                        <Link to="/orders/admin">
                            <i className="fa fa-list"></i> Quản lý đơn hàng
                        </Link>
                    </li>
                ) : ('')
                }
                    {user && user.role === 1 ? (

                        <li>
                            <Link to="/orders">
                                <i className="fa fa-list"></i> Quản lý đơn hàng
                            </Link>
                        </li>
                    ) : ('')
                    } {user && user.role === 1 ? (

                    <li>
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart"/> Giỏ hàng
                        </Link>
                    </li>
                ) : ('')
                }
                </ul>
            </div>

        </>
    )

}

export default Dashboard;