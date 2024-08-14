import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Order() {
    const user = JSON.parse(localStorage.getItem("user"));

    const {id}=useParams();
    const [order, setOrder] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/items/${id}`)
            .then(response=>setOrder(response.data))
            .catch(error => console.error("Lỗi khong lấy được sản phẩm trong đơn hàng",error));
    }, [id]);
    console.log("sp là",order);
    return(
        <>
            <main className="main-content">

                < div className="order container" style={{height:"420px"}}>
                    <a href={"/orders"}>Về đơn hàng</a>
                    <h1>Thông tin chi tiết về đơn {id} của tài khoản {user.name}</h1>
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
                        {order.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.product.name}</td>
                                <td>{item.variant ? item.variant.name : 'Không có'}</td>
                                <td>{item.quantity}</td>
                                <td>{((item.price)*1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default Order;