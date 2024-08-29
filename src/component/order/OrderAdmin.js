import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Pagination} from "@mui/material";
function OrderAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [currentPage,setCurrentPage]=useState(1);
    const [orderPage]=useState(10);
    const indexOfLastOrder=currentPage*orderPage;
    const indexOfFirstOrder=indexOfLastOrder-orderPage;
    const {id}=useParams();
    const [order, setOrder] = useState([]);
    const currentOrder=order.slice(indexOfFirstOrder,indexOfLastOrder);

    const handlePageChange=(event,value)=>{
        setCurrentPage(value);
    };
    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/items/${id}`)
            .then(response=>setOrder(response.data))
            .catch(error => console.error("Lỗi khong lấy được sản phẩm trong đơn hàng",error));
    }, [id]);
    console.log("sp là",order);
    return(
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
                                        <h1>Thông tin chi tiết về đơn {id}</h1>
                                    </div>
                                    <Link to={`/orders/admin`}><button className="btn-add">
                                        Về danh sách đơn hàng
                                    </button></Link>
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
                                    <div style={{marginLeft: '400px'}}>
                                        <Pagination
                                            count={Math.ceil(order.length / orderPage)}
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
    )
}

export default OrderAdmin;