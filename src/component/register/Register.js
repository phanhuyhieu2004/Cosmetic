import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    const [statusEyes, setStatusEyes] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        setStatusEyes(prevStatus => !prevStatus);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn form tự động gửi đi và tải lại trang



        if (username.length < 5|| username.length > 15) {
            alert("Tên đăng nhập phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        if (password.length < 5 || password.length >15) {
            alert("Mật khẩu phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        axios.post("http://localhost:8080/api/account/register", {
            name: username,
            pass: password
        })
            .then(response => {
                console.log(response.data);
                alert("Đăng ký thành công!");
                navigate("/login");


                setUsername("");
                setPassword("")
            })


            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('Lỗi không xác định.');
                    console.log("Lỗi",error)
                }
            });
    }

    return (
        <>
            <main className="main-content">
                <div className="container login-container">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <h1 className="form-heading">Đăng ký</h1>
                        <div className="form-group">
                            <i className="far fa-user"></i>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-key"></i>
                            <input
                                type={statusEyes ? "text" : "password"}
                                className="form-input"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="eye" onClick={handleClick}>
                                <i className={statusEyes ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                            </div>
                        </div>
                        <div className="form-link">
                            <a href="/login">Đã có tài khoản ? <span>Đăng nhập</span></a>
                        </div>
                        <input type="submit" className="form-submit" value="Đăng ký"/>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Register;
