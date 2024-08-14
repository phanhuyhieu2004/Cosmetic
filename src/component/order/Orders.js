import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Orders() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders`)
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu phản hồi
                // Đảm bảo response.data là một mảng
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('Dữ liệu phản hồi không đúng định dạng:', response.data);
                }
            })
            .catch(error => console.error('Lỗi khi lấy đơn hàng:', error));
    }, [user.id]);

    return (
        <>
            <h1>Đơn hàng của bạn</h1>
            <table style={{border:"5px solid black",margin:"50px auto" }}>
                <thead>
                <tr>
                    <th>Mã Đơn</th>
                    <th>Ngày tạo</th>
                    <th>Trạng thái thanh toán</th>
                    <th>Trạng thái vận chuyển</th>
                    <th>Tổng đơn</th>
                    <th>Xem chi tiet</th>
                </tr>
                </thead>
                <tbody>
                {orders
                    .filter(item => item.account.id === user.id)

                    .map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.createdAt[2]}-{item.createdAt[1]}-{item.createdAt[0]}</td>
                        <td>{item.paymentStatus}</td>
                        <td>{item.shippingStatus}</td>
                        <td>{((item.totalPrice)*1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td><Link to={`/order/${item.id}`}>Xem chi tiet</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default Orders;
