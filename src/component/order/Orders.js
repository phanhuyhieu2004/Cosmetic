import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Pagination} from "@mui/material";

function Orders() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
const [currentPage,setCurrentPage]=useState(1);
const [orderPerPage]=useState(10);
const indexOfLastOrder=currentPage*orderPerPage;
const indexOfFirstOrder=indexOfLastOrder-orderPerPage;
const currentOrders=orders.slice(indexOfFirstOrder,indexOfLastOrder);
const handlePageChange=(event,value)=>{
    setCurrentPage(value);
}
    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders`)
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu phản hồi
                // Đảm bảo response.data là một mảng
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('Dữ liệu phản hồi không đúng định dạng:', response.data);
                }
            })
            .catch(error => console.error('Lỗi khi lấy đơn hàng:', error));
    }, [user.id]);

    return (
        <>

            <main>
                <meta name="robots" content="noindex, nofollow"/>
                <section className="archive__page page-single">
                    <div className="container">
                        <main className="archive__content" role="main">
                            <div className="form">
                                <div className="wrapper">
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
                                    </div>                                    <div className="form-content">
                                        <div className="form-title">
                                            <h1>Đơn hàng của tài khoản {user.name}</h1>
                                        </div>

                                        <table style={{border: "5px solid black", margin: "50px auto"}}>
                                            <thead>
                                            <tr>
                                                <th>Mã Đơn</th>
                                                <th>Ngày tạo</th>
                                                <th>Trạng thái thanh toán</th>
                                                <th>Trạng thái vận chuyển</th>
                                                <th>Tổng đơn</th>
                                                <th>Xem chi tiet</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {currentOrders
                                                .filter(item => item.account.id === user.id)

                                                .map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.createdAt[2]}-{item.createdAt[1]}-{item.createdAt[0]}</td>
                                                        <td>{item.paymentStatus}</td>
                                                        <td>{item.shippingStatus}</td>
                                                        <td>{((item.totalPrice) * 1000).toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</td>
                                                        <td><Link to={`/order/${item.id}`}>Xem chi tiet</Link></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div style={{marginLeft: '400px'}}>
                                            <Pagination
                                                count={Math.ceil(orders.length / orderPerPage)}
                                                page={currentPage}
                                                onChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Orders;
