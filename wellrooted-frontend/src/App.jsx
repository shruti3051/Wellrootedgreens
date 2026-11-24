import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import OurStory from "./pages/OurStory";
import SeedToPlate from "./pages/SeedToPlate";
import Learn from "./pages/Learn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route path="/seed-to-plate" element={<SeedToPlate />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
