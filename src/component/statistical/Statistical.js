import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from 'react-vis';

function Statistical() {
    const [totalSold, setTotalSold] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [revenue, setRevenue] = useState(null);
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get('http://localhost:8080/api/orders/items/total-sold')
            .then(response => {
                setTotalSold(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy số lượng bán:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/orders/count-order-status')
            .then(response => {
                const countsArray = response.data[0] || [];
                const [completedCount, cancelledCount, processingCount] = countsArray;

                setChartData([
                    { status: 'Hoàn thành', count: completedCount || 0 },
                    { status: 'Hủy', count: cancelledCount || 0 },
                    { status: 'Đang xử lý', count: processingCount || 0 }
                ]);
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);
console.log('dữ liệu',chartData);
    const handleFetchRevenue = async () => {
        let url = '';
        if (date) {
            url = `http://localhost:8080/api/orders/daily?date=${date}`;
        } else if (month && year) {
            url = `http://localhost:8080/api/orders/monthly?month=${month}&year=${year}`;
        } else if (year) {
            url = `http://localhost:8080/api/orders/yearly?year=${year}`;
        }

        if (url) {
            const response = await axios.get(url);
            setRevenue(response.data);
        }
    };

    return (
        <>
            <main>
                <div className="breadcrumb-shop">
                    <div className="container container-pd1">
                        <div className="breadcrumb-list">
                            <ol className="breadcrumb breadcrumb-arrows">
                                <li><a href="/home"><span>Trang chủ</span></a></li>
                                <li><a href="/list"><span>Quản lý sản phẩm</span></a></li>
                                <li><a href="/statistical"><span>Thống kê</span></a></li>
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
                                            <h1>Tổng số sản phẩm bán ra: {totalSold}</h1>
                                        </div>
                                        <div className="form-title">
                                            <h1>Báo cáo doanh thu</h1>
                                        </div>
                                        <div className="form-time">
                                            <div className={"form-date"}>
                                                <label>Chọn ngày:</label>
                                                <input type="date" value={date}
                                                       onChange={(e) => setDate(e.target.value)}/>
                                            </div>
                                            <div className={"form-date"}>
                                                <label>Chọn tháng:</label>
                                                <input type="month" value={month}
                                                       onChange={(e) => setMonth(e.target.value)}/>
                                            </div>
                                            <div className={"form-date"}>
                                                <label>Chọn năm:</label>
                                                <input type="number" value={year}
                                                       onChange={(e) => setYear(e.target.value)}
                                                       placeholder="YYYY"/>
                                            </div>

                                        </div>
                                        <div className={"form-button"}>
                                            <button onClick={handleFetchRevenue}>Lấy doanh thu</button>

                                            {revenue && (
                                                <div>
                                                    <h4 className={'title-revenue'}>Doanh
                                                        thu: {revenue.totalRevenue ? ((revenue.totalRevenue) * 1000).toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }) : 'Không có'}</h4>
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-title">
                                            <h1>Tổng số đơn hàng theo từng trạng thái thanh toán</h1>
                                        </div>
                                        <div style={{height: 400}}>
                                            <XYPlot height={300} width={600} xType="ordinal"
                                                    margin={{left: 50, right: 20, top: 50, bottom: 50}}>
                                                <VerticalBarSeries
                                                    data={chartData.map(item => ({x: item.status, y: item.count}))}
                                                    color="deeppink" barWidth={0.5}
                                                />
                                                <YAxis title="Số lượng"/>
                                                <XAxis position="middle"/>
                                            </XYPlot>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Statistical;