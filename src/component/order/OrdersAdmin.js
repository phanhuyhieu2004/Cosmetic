import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Pagination, Tooltip} from "@mui/material";
import {Close, Delete, Done, Edit, ExitToAppOutlined, ListAlt, RemoveRedEyeOutlined} from "@mui/icons-material";
import Dashboard from "../dashboard/Dashboard";

function OrdersAdmin() {
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
    function fetchOrders() {
        axios.get(`http://localhost:8080/api/orders`)
            .then(response => {
                console.log(response.data);

                setOrders(response.data);

            })
            .catch(error => console.error('Lỗi khi lấy đơn hàng:', error));

    }

    useEffect(() => {
        fetchOrders();
    }, []);
    function updateOrderStatus(orderId) {
        axios.put(`http://localhost:8080/api/orders/${orderId}`, {
            paymentStatus: 'Hoàn thành',
            shippingStatus: 'Hoàn thành'
        })
            .then(response => {

                console.log('Trạng thái đơn hàng đã được cập nhật:', response.data);
                fetchOrders();

            })
            .catch(error => console.error('Lỗi khi cập nhật đơn hàng:', error));
    }
    function updateOrderStatusFail(orderId) {
        axios.put(`http://localhost:8080/api/orders/${orderId}`, {
            paymentStatus: 'Hủy',
            shippingStatus: 'Hủy'
        })
            .then(response => {

                console.log('Trạng thái đơn hàng đã được cập nhật:', response.data);
                fetchOrders();

            })
            .catch(error => console.error('Lỗi khi cập nhật đơn hàng:', error));
    }

    return(
        <>
            <main>
                <div className="breadcrumb-shop">
                    <div className="container container-pd1">
                        <div className="breadcrumb-list">
                            <ol className="breadcrumb breadcrumb-arrows">
                                <li><a href="/home"><span>Trang chủ</span></a></li>
                                <li><a href="/list"><span>Quản lý sản phẩm</span></a></li>
                                <li><a href="/orders/admin"><span>Quản lý đơn hàng của khách hàng</span></a></li>
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
                                                        <th>Hành động</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {currentOrders


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
                                                                <td><Link to={`/order/admin/${item.id}`}>Xem chi
                                                                    tiet</Link>
                                                                </td>
                                                                <td style={{display: "flex", borderBottom: 'none',justifyContent:'center'}}>
                                                                    <Tooltip title="Hoàn thành">
        <span onClick={() => updateOrderStatus(item.id)}>
            <Done/>
        </span>
                                                                    </Tooltip>
                                                                    <Tooltip title="Hủy">
        <span onClick={() => updateOrderStatusFail(item.id)}>
            <Close/>
        </span>
                                                                    </Tooltip>

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
    )
}

export default OrdersAdmin;