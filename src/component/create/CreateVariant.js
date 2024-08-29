import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";


function CreateVariant() {
    const user = JSON.parse(localStorage.getItem("user"));

    const {id,name}=useParams();
    const [nameVariant, setNameVariant] = useState("");
    const navigate=useNavigate();
    function checkSpecial(str) {
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
        return specialChars.test(str);

    }

    const handleSubmit = (e) => {
        e.preventDefault();


        if (checkSpecial(nameVariant)) {
            alert("Tên sản phẩm có kí tự đặc biệt, mời nhập lại!")
            return;
        }


        const formData = {
            name: nameVariant,

        };

        axios.post(`http://localhost:8080/api/variants/${id}`, formData)
            .then(response => {
                alert("Thêm biến thể thành công!");
                navigate(`/variants/${id}/${name}`);
            })
            .catch(error => {
                console.error('Lỗi không thêm được biến thể:', error);
            });
    };
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
                                            <h1>Thêm biến thể của {name}</h1>
                                        </div>
                                        <Link to={`/variants/${id}/${name}`}>
                                            <button className="btn-add">
                                                Danh sách biến thể
                                            </button>
                                        </Link>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-profile">

                                                <div className="edit-row edit-row-email">
                                                    <div className="col-1 col-md-4">Tên sản phẩm <span>(*)</span></div>
                                                    <div className="col-2">
                                                        <input
                                                            className="input form-control"
                                                            type="text"
                                                            placeholder="Nhập tên"
                                                            value={nameVariant}
                                                            onChange={(e) => setNameVariant(e.target.value)}
                                                            required
                                                        />
                                                        <p className="register-notify">
                                                            Lưu ý: Tên biến thể phải tối thiểu từ 5 đến tối đa là 50 ký
                                                            tự.
                                                        </p>
                                                    </div>
                                                </div>


                                                <div className="edit-row">
                                                    <div className="col-1"/>
                                                    <div className="col-2">
                                                        <div className="action">
                                                            <button className="btn-form">
                                                                Thêm biến thể
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-3"/>
                                                </div>
                                            </div>
                                        </form>
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

export default CreateVariant;