
import './App.css';

import { Routes, Route } from 'react-router-dom';
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import Product from "./component/product/Product";

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
        />   <Route
            path="/product"
            element={
              <>
                <Header/>
<Product/>
              </>
            }
        />

      </Routes>
    </div>
  );
}

export default App;
