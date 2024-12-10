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
        event.preventDefault();



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
            <div className={"main-body"}>
                <div className="wrappers">
                    <form action="#" onSubmit={handleSubmit}>
                        <h2>Đăng ký</h2>
                        <div className="input-field">
                            <input type="text" value={username}
                                   onChange={(e) => setUsername(e.target.value)} required/>
                            <label>Nhập tên đăng nhập</label>
                        </div>
                        <div className="input-field">
                            <input type="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)} required/>
                            <label>Nhập mật khẩu</label>
                        </div>
                        <div className="forget">
                            <label htmlFor="remember">
                                <input type="checkbox" id="remember"/>
                                <p>Ghi nhớ mật khẩu</p>
                            </label>
                            <a href="#">Quên mật khẩu?</a>
                        </div>
                        <button type="submit">Đăng ký</button>
                        <div className="register">
                            <p>Nếu đã có tài khoản? <a href="/login">Đăng nhập</a></p>
                        </div>
                    </form>
                </div>

            </div>

        </>
    );
}

export default Register;
