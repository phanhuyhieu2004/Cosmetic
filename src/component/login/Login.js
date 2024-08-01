import "./Login.css"
import {useState} from "react";

function Login() {
    const [statusEye,setStatusEye]=useState(false);
    const handleClick = () => {
        setStatusEye(statusEye=>!statusEye);

    }
    return (
        <>
            <main className="main-content">
                <div className="container login-container">
                    <form className="form-login">
                        <h1 className="form-heading">Đăng nhập</h1>
                        <div className="form-group">
                            <i class="far fa-user"></i>
                            <input type="text" className="form-input" placeholder="Tên đăng nhập"/>

                        </div>
                        <div className="form-group">
                            <i className="fas fa-key"></i>
                            <input type={statusEye?"text":"password"} className="form-input" placeholder="Mật khẩu"/>
                            <div className="eye" onClick={handleClick}>
                                <i className={statusEye?"fa-solid fa-eye":"fa-solid fa-eye-slash"}></i>
                            </div>
                        </div>
                        <input type="submit" className="form-submit" value={"Đăng nhập"}/>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login;