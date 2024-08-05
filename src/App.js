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


function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/home"
                    element={
                        <>
                            <Header/>
                            <Home/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <>
                            <Header/>
                            <Cart/>
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
