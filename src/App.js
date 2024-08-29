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
import List from "./component/list/List";
import Update from "./component/update/Update";
import ListVariants from "./component/list/ListVariants";
import CreateVariant from "./component/create/CreateVariant";
import UpdateVariant from "./component/update/UpdateVariant";
import Statistical from "./component/statistical/Statistical";
import OrdersAdmin from "./component/order/OrdersAdmin";
import OrderAdmin from "./component/order/OrderAdmin";


function App() {
    return (
        <div className="App" style={{ display: 'flex',
            flexDirection: 'column'}}>
            <Routes>

                <Route element={<PrivateRoute redirectTo="/login"/>}>
                    <Route
                        path="/create"
                        element={
                            <>
                                <Header/>
                                <Create/>
                                <Footer/>
                            </>
                        }
                    />   <Route
                        path="/statistical"
                        element={
                            <>
                                <Header/>
                                <Statistical/>
                                <Footer/>
                            </>
                        }
                    /> <Route
                        path="/create/:id/:name"
                        element={
                            <>
                                <Header/>
                                <CreateVariant/>
                                <Footer/>
                            </>
                        }
                    /> <Route
                        path="/variant/:variantId/:id/:name"
                        element={
                            <>
                                <Header/>
                                <UpdateVariant/>
                                <Footer/>
                            </>
                        }
                    /> <Route
                        path="/variants/:id/:name"
                        element={
                            <>
                                <Header/>
                                <ListVariants/>
                                <Footer/>
                            </>
                        }
                    /><Route
                        path="/product/update/:id"
                        element={
                            <>
                                <Header/>
                                <Update/>
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
                    /><Route
                        path="/list"
                        element={
                            <>
                                <Header/>
                                <List/>
                                <Footer/>

                            </>
                        }
                    /><Route
                        path="/orders/admin"
                        element={
                            <>
                                <Header/>
                                <OrdersAdmin/>
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
                /> <Route
                    path="/order/admin/:id"
                    element={
                        <>
                            <Header/>
                            <OrderAdmin/>
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
