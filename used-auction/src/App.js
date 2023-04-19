import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import MyStore from "./components/myStore/MyStore";
import ProductManagement from "./components/myStore/ProductManagement";
import ProductList from "./components/productListView/ProductList";
import SellProduct from "./components/sellProduct/SellProduct";
import ChatList from "./components/chattingRoom/ChatList";
import { API } from "./config";
import { useRecoilState } from "recoil";
import { loginState } from "./recoil/loginState";
import Product from "./components/productView/Product";
const layoutStyle = {
  margin: "0 auto",
  width: "1200px",
};

function App() {
  const [token, setToken] = useRecoilState(loginState);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.patch["Content-Type"] = "application/json";

  return (
    <div style={layoutStyle}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/usedAuctionFE" element={<Main></Main>}></Route>
          <Route path="/usedAuctionFE/myStore" element={<MyStore />}></Route>
          <Route path="/usedAuctionFE/sellProduct" element={<SellProduct />}></Route>
          <Route path="/usedAuctionFE/chattingRoom" element={<ChatList />}></Route>
          <Route
            path="/usedAuctionFE/productList"
            element={<ProductList />}
          ></Route>
          <Route
            path="/usedAuctionFE/productList/productDetail/:productId"
            element={<Product />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;