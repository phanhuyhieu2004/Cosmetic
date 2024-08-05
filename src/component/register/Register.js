import React, {useState} from "react";

function Register() {
    const [statusEyes,setStatusEyes]=useState(false);
    const handleClick = () => {
        setStatusEyes(statusEyes=>!statusEyes);

    }
    return (
        <>
            <main className="main-content">
                <div className="container login-container">
                    <form className="form-login">
                        <h1 className="form-heading">Đăng ký</h1>
                        <div className="form-group">
                            <i class="far fa-user"></i>
                            <input type="text" className="form-input" placeholder="Tên đăng nhập"/>

                        </div>
                        <div className="form-group">
                            <i className="fas fa-key"></i>
                            <input type={statusEyes?"text":"password"} className="form-input" placeholder="Mật khẩu"/>
                            <div className="eye" onClick={handleClick}>
                                <i className={statusEyes?"fa-solid fa-eye":"fa-solid fa-eye-slash"}></i>
                            </div>
                        </div>
                        <div className="form-link">
                            <a href="/register">Đã có tài khoản ? <span>Đăng nhập</span></a>
                        </div>
                        <input type="submit" className="form-submit" value={"Đăng ký"}/>
                    </form>


                </div>
            </main>
        </>
    )
}
export default Register;