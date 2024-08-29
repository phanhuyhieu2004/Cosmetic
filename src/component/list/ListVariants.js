import {Link, useParams} from "react-router-dom";
import {Pagination, Tooltip} from "@mui/material";
import {Delete, Edit, ListAlt, RemoveRedEyeOutlined} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import axios from "axios";

function ListVariants() {
    const user = JSON.parse(localStorage.getItem("user"));

    const {id,name}=useParams();
    // trang hiện tại mà người dùng xem
    const [currentPage, setCurrentPage] = useState(1);
    // số biến thể  ở mỗi trang
    const [variantsPerPage] = useState(10);
    const [variants, setVariants] = useState([]);
// vị trí cuôối cùng của biến thể = trang hiêện tại nhân với số biến thể ở mỗi trang
//     10
    const indexOfLastVariant = currentPage * variantsPerPage;
    // 0
    // chỉ số đầu tiên của biến thể trong trang hiện tại bằng chỉ số cuối cùng trừ đi số biến thể mỗi trang
    const indexOfFirstVariant = indexOfLastVariant - variantsPerPage;
    // danh sách truyện dđược hiển thị trong trang hiện tại
    // 0,10
    const currentVariants = variants.slice(indexOfFirstVariant, indexOfLastVariant);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    function fetchVariants() {
        axios.get(`http://localhost:8080/api/variants/${id}`)
            .then(response => setVariants(response.data))
            .catch(error => console.error("Lỗi không lấy được biến thể:", error.message));
    }
    useEffect(() => {
        fetchVariants();
    }, []);
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
                                    </div>
                                    <div className="form-content">
                                        <div className="form-title">
                                            <h1>Danh sách biến thể của {name}</h1>
                                        </div>
                                        <Link to={`/create/${id}/${name}`}>
                                            <button className="btn-add">
                                                Thêm biến thể
                                            </button>
                                        </Link>
                                        <table style={{border: "5px solid black", margin: "50px auto"}}>
                                            <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Ngày tạo</th>
                                                <th>Tên biến thể</th>
                                                <th>Tên sản phẩm</th>

                                                <th>Hành động</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {currentVariants
                                                .map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.createdAt[2]}-{item.createdAt[1]}-{item.createdAt[0]}</td>
                                                        <td style={{textTransform: 'capitalize'}}>{item.name}</td>

                                                        <td>{item.products.name}</td>
                                                        <td>


                                                            <Tooltip title="Cập nhật biến thể">
                                                                <Link to={`/variant/${item.id}/${id}/${name}`}>
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
                                                count={Math.ceil(variants.length / variantsPerPage)}
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

export default ListVariants;