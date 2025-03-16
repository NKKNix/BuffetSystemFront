import React from 'react';
import Topbar from './components/navbar';
import About from './pages/About';
import OrderTable from './pages/Order';
import FoodMenu from './api/FoodMenu';
import Users from './api/Users'
import FoodTable from './pages/FoodTable';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ShowTable from './pages/ShowTable';
import QRCodeGenerator from './pages/GenQR';
const App = () => {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/เมนู" element={<FoodMenu/>} />
        <Route path="/ผู้ใช้" element={<Users/>} />
        <Route path="/รายการอาหาร" element={<OrderTable/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<FoodMenu/>} />
        <Route path="/โต๊ะอาหาร" element={<FoodTable/>} />
        <Route path="/โต๊ะอาหาร/:id" element={<ShowTable/>} />
        <Route path="/qrcode/:id" element={<QRCodeGenerator/>} />
      </Routes>
    </Router>

    
  );
};

export default App;
