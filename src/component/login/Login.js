import "./Login.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const [statusEye, setStatusEye] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        setStatusEye(statusEye => !statusEye);

    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn form tự động gửi đi và tải lại trang


        if (username.length < 5 || username.length > 15) {
            alert("Tên đăng nhập phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        if (password.length < 5 || password.length > 15) {
            alert("Mật khẩu phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        axios.post("http://localhost:8080/api/account/login", {
            name: username,
            pass: password
        })
            .then(response => {
                console.log(response.data);
                const  user  = response.data;
console.log("tài khoản là ",user)
                if (user) {
                    // lưu tài khoản vừa đăng nhâập vaào localStrage
                    localStorage.setItem("user", JSON.stringify(user));
                    alert("Đăng nhập thành công!");
                    navigate("/home");
                } else {
                    console.error("Dữ liệu người dùng không có trong phản hồi.");
                }
            })

            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('Lỗi không xác định.');
                    console.log("Lỗi", error)
                }
            });
    }
    return (
        <>

            <div className={"main-body"}>
                <div className="wrappers">
                    <form action="#"  onSubmit={handleSubmit}>
                        <h2>Đăng nhập</h2>
                        <div className="input-field">
                            <input type="text"  value={username}
                             onChange={(e) => setUsername(e.target.value)} required/>
                            <label>Nhập tên đăng nhập</label>
                        </div>
                        <div className="input-field">
                            <input type="password"  value={password}
                               onChange={(e) => setPassword(e.target.value)} required/>
                            <label>Nhập mât khẩu</label>
                        </div>
                        <div className="forget">
                            <label htmlFor="remember">
                                <input type="checkbox" id="remember"/>
                                <p>Ghi nhớ mật khẩu</p>
                            </label>
                            <a href="#">Quên mật khẩu?</a>
                        </div>
                        <button type="submit">Đăng nhập</button>
                        <div className="register">
                            <p>Nếu không có tài khoản? <a href="/register">Đăng ký</a></p>
                        </div>
                    </form>
                </div>

            </div>


        </>
    )
}

export default Login;