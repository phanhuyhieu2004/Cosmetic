import { Link, useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import axios from "axios";
import striptags from "striptags";
function Update() {
    const user = JSON.parse(localStorage.getItem("user"));

    const { id } = useParams();
    const navigate = useNavigate();
    const [files, setFiles] = useState([null, null, null, null, null]);
    const [filePreviews, setFilePreviews] = useState(["", "", "", "", ""]);
    const [subCategories, setSubCategories] = useState([]);
    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [images, setImages] = useState([]);
    const [imageIds, setImageIds] = useState([]);
console.log("id ảnh",imageIds)
    useEffect(() => {
        axios.get(`http://localhost:8080/api/images`)
            .then(response => {
                setImages(response.data);
                setImageIds(response.data.map(image => image.id));
            })
            .catch(error => console.error('Lỗi không lấy được ảnh:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/subcategories')
            .then(response => {
                setSubCategories(response.data);
            })
            .catch(error => console.error('Lỗi không lấy được danh mục con:', error));

        axios.get(`http://localhost:8080/api/products/product/${id}`)
            .then(response => {
                const product = response.data;
                setProductName(product.name);
                setBrand(product.brand);
                setPrice(product.price);
                setQuantity(product.quantity);
                setDescription(product.description);
                setSelectedCategory(product.subcategories.id);

                const productImages = images.filter(image => image.products.id === product.id);
                setFiles(productImages.map(image => image.name));
                setFilePreviews(productImages.map(image => image.name));
                setImageIds(productImages.map(image => image.id));
                // lọc qua nhiều lần để lấy được các ảnh thuộc sản phẩm này
            })
            .catch(error => console.error('Lỗi không lấy được thông tin sản phẩm:', error));
    }, [id, images]);

    const handleFileChange = (index) => (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
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

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
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

    function checkSpecial(str) {
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
        return specialChars.test(str);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const hasEmptyFile = files.some(file => file === null);
        if (hasEmptyFile) {
            alert("Vui lòng chọn ảnh cho tất cả các vị trí.");
            return;
        }
        if (checkSpecial(productName)) {
            alert("Tên sản phẩm có kí tự đặc biệt, mời nhập lại!");
            return;
        }
        if (checkSpecial(brand)) {
            alert("Tên nhãn hàng có kí tự đặc biệt, mời nhập lại!");
            return;
        }
        const descriptionContent = striptags(description);
        if (checkSpecial(descriptionContent)) {
            alert("Mô tả sản phẩm có ký tự đặc biệt, mời nhập lại !!!");
            return;
        }

        const formData = {
            name: productName,
            brand,
            price,
            quantity,
            description,
            subcategoryId: selectedCategory,
            images: files.map((file, index) => ({
                name: file,
                id: imageIds[index]
            }))
        };

        axios.put(`http://localhost:8080/api/products/${id}`, formData)
            .then(response => {
                alert("Sửa sản phẩm thành công!");
                navigate('/list');
            })
            .catch(error => {
                console.error('Lỗi không sửa được sản phẩm:', error);
            });
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': '1' }, { 'header': '2' }, 'blockquote'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'align': [] }],
            ['clean']
        ]
    };

    return (
        <>
            <main>
                <meta name="robots" content="noindex, nofollow" />
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
                                    </div>                                    <div className="form-content">
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
                                                                                     alt={`Ảnh ${index + 1}`}
                                                                                     width="200"
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
                                                            Lưu ý: Tên sản phẩm phải tối thiểu từ 5 đến tối đa là 50 ký
                                                            tự.
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
        </>
    );
}

export default Update;
