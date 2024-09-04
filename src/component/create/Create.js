import {Link, useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import './create.css';
import 'react-quill/dist/quill.snow.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function Create() {
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    // khởi tạo mảng với 5 đối tượng null
    const [files, setFiles] = useState([null, null, null, null, null]);
    // khởi tạo mảng có 5 chuỗi rỗng
    const [filePreviews, setFilePreviews] = useState(["", "", "", "", ""]);
    const [subCategories, setSubCategories] = useState([]);
    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/subcategories')
            .then(response => {
                setSubCategories(response.data);
            })
            .catch(error => console.error('Lỗi không lấy được danh mục con:', error));
    }, []);

    const handleFileChange = (index) => (e) => {
        const selectedFile = e.target.files[0];
        // Khi người dùng chọn một tệp, hàm này lấy tệp đầu tiên từ e.target.files.
        if (!selectedFile) return;

        const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
        // selectedFile.name.split('.') chia tên file thành các phần(mảng chưứa caác chuối con) dựa trên dấu chấm (.).
        // .pop() lấy phần cuối cùng của mảng kết quả, tức là phần mở rộng của file.
        //         .toLowerCase() chuyển phần mở rộng này thành chữ thường để dễ so sánh.
        if (!validExtensions.includes(fileExtension)) {
            alert("Không phải ảnh, vui lòng chọn lại.");
            setFiles(prev => {
                const updated = [...prev];
                updated[index] = null;
                return updated;
            });
            setFilePreviews(prev => {
                const updated = [...prev];
                updated[index] = "";
                return updated;
            });
            return;
        }
        // FileReader là một API của JavaScript dùng để đọc nội dung của file. Nó có thể đọc file dưới nhiều định dạng khác nhau, trong trường hợp này là định dạng URL (Data URL).

        const reader = new FileReader();
        // readAsDataURL(selectedFile) đọc nội dung của file và chuyển đổi nó thành một URL dữ liệu (data URL). URL này có thể được sử dụng để hiển thị hình ảnh trong trang web mà không cần tải lên server.
        reader.readAsDataURL(selectedFile);
        // reader.onloadend: Sự kiện này được kích hoạt khi FileReader hoàn thành việc đọc file.
        reader.onloadend = () => {
            setFiles(prev => {
                const updated = [...prev];
                updated[index] = reader.result;
                return updated;
            });
            setFilePreviews(prev => {
                const updated = [...prev];
                updated[index] = reader.result;
                return updated;
            });
        };
    };
    console.log("Anh", files);
    console.log("Anh xem truoc", filePreviews);

    function checkSpecial(str) {
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
        return specialChars.test(str);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // // Kiểm tra xem có ảnh nào chưa được chọn
        const hasEmptyFile = files.some(file => file === null);
        if (hasEmptyFile) {
            alert("Vui lòng chọn ảnh cho tất cả các vị trí.");
            return;
        }
        if (checkSpecial(productName)) {
            alert("Tên sản phẩm có kí tự đặc biệt, mời nhập lại!")
            return;
        }



        const formData = {
            name: productName,
            brand,
            price,
            quantity,
            description,
            subcategoryId: selectedCategory,
            images: files.map(file => ({
                name: file,

            }))
        };

        axios.post('http://localhost:8080/api/products', formData)
            .then(response => {
                alert("Thêm sản phẩm thành công!");
                navigate('/home');
            })
            .catch(error => {
                console.error('Lỗi không thêm được sản phẩm:', error);
            });
    };

    const modules = {
        toolbar: [
            [{'font': []}, {'size': []}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'header': '1'}, {'header': '2'}, 'blockquote'],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'align': []}],
            ['clean']
        ]
    };

    return (
        <main>
            <div className="breadcrumb-shop">
                <div className="container container-pd1">
                    <div className="breadcrumb-list">
                        <ol className="breadcrumb breadcrumb-arrows">
                            <li><a href="/home"><span>Trang chủ</span></a></li>
                            <li><a href="/list"><span>Quản lý sản phẩm</span></a></li>
                            <li><a href="/create"><span>Thêm sản phẩm</span></a></li>
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
                                        <h1>Thêm sản phẩm</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-profile">
                                            <div style={{display: 'flex'}}>
                                                {files.map((file, index) => (
                                                    <div className="edit-row" key={index}>
                                                        <div className="col-1">
                                                            Chọn ảnh sản phẩm {index + 1}<span>(*)</span>
                                                        </div>
                                                        <div className="col-2 row-avatar">
                                                            <div className="image-upload">
                                                                <input
                                                                    type="file"
                                                                    id={`file-input-${index}`}
                                                                    accept=".jpg, .jpeg, .png, .gif"
                                                                    onChange={handleFileChange(index)}
                                                                    style={{display: 'none'}}
                                                                />
                                                                <label htmlFor={`file-input-${index}`}>
                                                                    <div className="image-preview">
                                                                        {filePreviews[index] ? (
                                                                            <img src={filePreviews[index]}
                                                                                 alt={`Ảnh ${index + 1}`} width="200"
                                                                                 height="200"/>
                                                                        ) : (
                                                                            <div className="image-icon">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="currentColor"
                                                                                    width="50"
                                                                                    height="50"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={2}
                                                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                                    />
                                                                                </svg>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="edit-row edit-row-email">
                                                <div className="col-1 col-md-4">Tên sản phẩm <span>(*)</span></div>
                                                <div className="col-2">
                                                    <input
                                                        className="input form-control"
                                                        type="text"
                                                        placeholder="Nhập tên"
                                                        value={productName}
                                                        onChange={(e) => setProductName(e.target.value)}
                                                        required
                                                    />
                                                    <p className="register-notify">
                                                        Lưu ý: Tên sản phẩm phải tối thiểu từ 5 đến tối đa là 50 ký tự.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="edit-row">
                                                <div className="col-1">Nhãn hàng <span>(*)</span></div>
                                                <div className="col-2">
                                                    <input
                                                        className="input form-control"
                                                        type="text"
                                                        placeholder="Nhập tên nhãn hàng"
                                                        value={brand}
                                                        onChange={(e) => setBrand(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div style={{display: 'flex'}}>
                                                <div className="edit-row">
                                                    <div className="col-1">Gía :<span>(*)</span></div>
                                                    <div className="col-2">
                                                        <input
                                                            className="input form-control"
                                                            type="number"
                                                            placeholder="Nhập giá"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="edit-row">
                                                    <div className="col-1">Số lượng : <span>(*)</span></div>
                                                    <div className="col-2">
                                                        <input
                                                            className="input form-control"
                                                            type="number"
                                                            placeholder="Nhập số lượng"
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="edit-row">
                                                <div className="col-1">Mô tả <span>(*)</span></div>
                                                <div className="col-2">
                                                    <ReactQuill
                                                        value={description}
                                                        onChange={setDescription}
                                                        modules={modules}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>

                                            <div className="edit-row">
                                                <div className="col-1">Danh mục <span>(*)</span></div>
                                                <div className="col-2">
                                                    <select
                                                        className="input form-control"
                                                        value={selectedCategory}
                                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Chọn danh mục</option>
                                                        {subCategories.map(category => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="edit-row">
                                                <div className="col-1"/>
                                                <div className="col-2">
                                                    <div className="action">
                                                        <button className="btn-form">
                                                            Thêm sản phẩm
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
    );
}

export default Create;
