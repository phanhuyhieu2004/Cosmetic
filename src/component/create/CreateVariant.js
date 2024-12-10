import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard";


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
                <div className="breadcrumb-shop">
                    <div className="container container-pd1">
                        <div className="breadcrumb-list">
                            <ol className="breadcrumb breadcrumb-arrows">
                                <li><a href="/home"><span>Trang chủ</span></a></li>
                                <li><a href="/list"><span>Quản lý sản phẩm</span></a></li>

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
                                            <h1>Thêm biến thể của {name}</h1>
                                        </div>
                                        <Link to={`/variants/${id}/${name}`} onClick={window.scroll(0,0)}>
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