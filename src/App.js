import './App.css';

import {Routes, Route} from 'react-router-dom';
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import Product from "./component/product/Product";
import Cart from "./component/cart/Cart";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Products from "./component/product/Products";
import PrivateRoute from "./PrivateRouter";
import Orders from "./component/order/Orders";
import Order from "./component/order/Order";
import Contact from "./component/contact/Contact";
import Searchs from "./component/home/Searchs";
import Create from "./component/create/Create";


function App() {
    return (
        <div className="App" style={{ display: 'flex',
            flexDirection: 'column'}}>
            <Routes>

                <Route element={<PrivateRoute redirectTo="/login"/>}>
                    <Route
                        path="/cart"
                        element={
                            <>
                                <Header/>
                                <Cart/>
                                <Footer/>

                            </>
                        }
                    /> <Route
                    path="/orders"
                    element={
                        <>
                            <Header/>
                            <Orders/>
                            <Footer/>

                        </>
                    }
                />
                    <Route
                    path="/order/:id"
                    element={
                        <>
                            <Header/>
                            <Order/>
                            <Footer/>

                        </>
                    }
                />
                    />
                </Route>
                <Route path="/home" element={
                    <>
                        <Header/>
                        <Home/>
                        <Footer/>
                    </>
                }
                />


                <Route
                    path="/product/:id"
                    element={
                        <>
                            <Header/>
                            <Product/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <Header/>
                            <Login/>
                            <Footer/>
                        </>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <>
                            <Header/>
                            <Register/>
                            <Footer/>
                        </>
                    }
                />    <Route
                    path="/map"
                    element={
                        <>
                            <Header/>
                            <Contact/>
                            <Footer/>
                        </>
                    }
                /> <Route
                    path="/create"
                    element={
                        <>
                            <Header/>
                            <Create/>
                            <Footer/>
                        </>
                    }
                /> <Route
                    path="/search"
                    element={
                        <>
                            <Header/>
                            <Searchs/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/products/:id/:name"
                    element={
                        <>
                            <Header/>
                            <Products/>
                            <Footer/>
                        </>
                    }
                />

            </Routes>
        </div>
    );
}

export default App;
