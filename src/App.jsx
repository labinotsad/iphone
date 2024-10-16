import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import Auth from "./pages/Auth";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header className='bg-black' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/auth' element={<Auth />} />

          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
