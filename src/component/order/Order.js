import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Pagination} from "@mui/material";
import Dashboard from "../dashboard/Dashboard";

function Order() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [currentPage, setCurrentPage] = useState(1);
    const [orderPage] = useState(10);
    const indexOfLastOrder = currentPage * orderPage;
    const indexOfFirstOrder = indexOfLastOrder - orderPage;
    const {id} = useParams();
    const [order, setOrder] = useState([]);
    const currentOrder = order.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/items/${id}`)
            .then(response => setOrder(response.data))
            .catch(error => console.error("Lỗi khong lấy được sản phẩm trong đơn hàng", error));
    }, [id]);
    console.log("sp là", order);
    return (
        <>

            <main>
                <div className="breadcrumb-shop">
                    <div className="container container-pd1">
                        <div className="breadcrumb-list">
                            <ol className="breadcrumb breadcrumb-arrows">
                                <li><a href="/home"><span>Trang chủ</span></a></li>
                                <li><a href="/orders"><span>Quản lý đơn hàng</span></a></li>
                                <li><Link to={`/order/${id}`}>Quản lý chi tiết đơn hàng</ Link></li>

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
                                            <h1>Thông tin chi tiết về đơn {id} của tài khoản {user.name}</h1>
                                        </div>
                                        <Link to={`/orders`}>
                                            <button className="btn-add">
                                                Về danh sách đơn hàng
                                            </button>
                                        </Link>
                                        <div className={'orders-detail'}>
                                            <div className={'orders-info'}>


                                                <table style={{border: "5px solid black", margin: "50px auto"}}>
                                                    <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Sản phẩm</th>
                                                        <th>Loại</th>
                                                        <th>Số lượng</th>
                                                        <th>Tổng giá</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {currentOrder.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.variant ? item.variant.name : 'Không có'}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{((item.price) * 1000).toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className={'pagination'}>

                                                <Pagination
                                                    count={Math.ceil(order.length / orderPage)}
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

export default Order;