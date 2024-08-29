import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Delete, Edit, ListAlt, RemoveRedEyeOutlined} from "@mui/icons-material";
import {Pagination, Tooltip} from "@mui/material";

function List() {
    const user = JSON.parse(localStorage.getItem("user"));

    // trang hiện tại mà người dùng xem
    const [currentPage, setCurrentPage] = useState(1);
    // số sản phẩm ở mỗi trang
    const [productsPerPage] = useState(10);
    const [products, setProducts] = useState([]);
// vị trí cuôối cùng của sản phẩm = trang hiêện tại nhân với số sản phẩm ở mỗi trang
//     10
    const indexOfLastProduct = currentPage * productsPerPage;
    // 0
    // chỉ số đầu tiên của sản phẩm trong trang hiện tại bằng chỉ số cuối cùng trừ đi số sản phẩm mỗi trang
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // danh sách truyện dđược hiển thị trong trang hiện tại
    // 0,10
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
console.log("vij tri dau",indexOfFirstProduct);
console.log("vi tri sau",indexOfLastProduct);
   function fetchProduct() {
       axios.get(`http://localhost:8080/api/products`)
            .then(response => setProducts(response.data))
            .catch(error => console.error("Lỗi không lấy được sản phẩm:", error.message));
    }
    useEffect(() => {
  fetchProduct();
    }, []);
    const deleteProduct = (productId) => {
        if (window.confirm("Bạn có muốn xoá truyện không?")) {
            axios.delete(`http://localhost:8080/api/products/${productId}`)
                .then(() => {
                    alert("Xóa sản phẩm thành công ")
                    fetchProduct();
                })
                .catch(error => {
                    console.error("Lỗi xoá truyện k đc", error);
                    alert("Lỗi rùi hi hi.");
                });
        }
    };
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
                                            { user && user.role === 0 ? (

                                                <li>
                                                <Link to="/list">
                                                    <i className="fa fa-bars"/> Danh sách sản phẩm
                                                </Link>
                                            </li>):('')
                                            }
                                            { user && user.role === 0 ? (

                                            <li>
                                                <Link to="/create">
                                                    <i className="fa fa-plus"></i> Thêm sản phẩm
                                                </Link>
                                            </li>
                                            ):('')
                                            }
                                            { user && user.role === 0 ? (

                                                <li>
                                            <Link to="/statistical">
                                                <i className=" fa fa-chart-simple"></i> Thống kê
                                            </Link>
                                        </li>
                                            ):('')
                                            }  { user && user.role === 0 ? (

                                                <li>
                                                    <Link to="/orders/admin">
                                                        <i className="fa fa-list"></i> Quản lý đơn hàng
                                                    </Link>
                                                </li>
                                            ):('')
                                            }
                                            { user && user.role === 1 ? (

                                                <li>
                                                    <Link to="/orders">
                                                        <i className="fa fa-list"></i> Quản lý đơn hàng
                                                    </Link>
                                                </li>
                                            ):('')
                                            } { user && user.role === 1 ? (

                                            <li>
                                                <Link to="/cart">
                                                    <i className="fas fa-shopping-cart"/> Giỏ hàng
                                                </Link>
                                            </li>
                                        ) : ('')
                                        }
                                        </ul>
                                    </div>
                                    <div className="form-content">
                                        <div className="form-title">
                                            <h1>Danh sách sản phẩm</h1>
                                        </div>
                                        <table style={{border: "5px solid black", margin: "50px auto"}}>
                                            <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Ngày tạo</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Gía</th>
                                                <th>Hãng</th>
                                                <th>Số lượng</th>
                                                <th>Danh mục</th>
                                                <th>Hành động</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {currentProducts
                                                .map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.createdAt[2]}-{item.createdAt[1]}-{item.createdAt[0]}</td>
                                                        <td>{item.name}</td>
                                                        <td>{((item.price) * 1000).toLocaleString('vi-VN',{style:'currency',currency:'VND'})}</td>
                                                        <td>{item.brand}</td>
                                                        <td>{item.quantity}</td>
                                                        <td style={{textTransform: "capitalize"}}>{item.subcategories.name}</td>
                                                        <td style={{display: "flex",borderBottom: 'none'}}>
                                                            <Tooltip title="Xem biến thể">
                                                                <Link to={`/variants/${item.id}/${item.name}`}>
                                                            <ListAlt/>
                                                                </Link>
                                                            </Tooltip>
                                                            <span
                                                                onClick={() => deleteProduct(item.id)}

                                                            >
                                                            <Tooltip title="Xoá sản phẩm">
                                                                <Delete/>
                                                            </Tooltip>
                                                        </span>
                                                            <Tooltip title="Xem sản phẩm">
                                                                <Link to={`/product/${item.id}`}>
                                                            <RemoveRedEyeOutlined/>
                                                                </Link>
                                                            </Tooltip>
                                                            <Tooltip title="Cập nhật sản phẩm">
                                                                <Link to={`/product/update/${item.id}`}>
                                                                    <Edit/>
                                                                </Link>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div style={{marginLeft: '400px'}}>
                                            <Pagination
                                                count={Math.ceil(products.length / productsPerPage)}
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

export default List;
