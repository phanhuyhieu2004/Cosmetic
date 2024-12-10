import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Pagination} from "@mui/material";
import Dashboard from "../dashboard/Dashboard";

function Orders() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderPerPage] = useState(10);
    const indexOfLastOrder = currentPage * orderPerPage;
    const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const handlePageChange = (event, value) => {
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
                <div className="breadcrumb-shop">
                    <div className="container container-pd1">
                        <div className="breadcrumb-list">
                            <ol className="breadcrumb breadcrumb-arrows">
                                <li><a href="/home"><span>Trang chủ</span></a></li>
                                <li><a href="/list"><span>Quản lý sản phẩm</span></a></li>
                                <li><a href="/orders"><span>Quản lý đơn hàng</span></a></li>
                            </ol>
                        </div>
                    </div>
                </div>

                <meta name="robots" content="noindex, nofollow"/>
                <section className="archive__page page-single">
                    <div className="container">
                        <main className="archive__content" role="main">
                            <div className="form">
                                <div className="wrapper">
                                    <Dashboard></Dashboard>
                                    <div className="form-content">
                                        <div className="form-title">
                                            <h1>Đơn hàng của tài khoản {user.name}</h1>
                                        </div>
                                        <div className={'orders-detail'}>
                                            <div className={'orders-info'}>
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
                                                                <td><Link to={`/order/${item.id}`}>Xem chi tiet</Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className={'pagination'}>


                                                <Pagination
                                                    count={Math.ceil(orders.length / orderPerPage)}
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                />
                                            </div>
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
