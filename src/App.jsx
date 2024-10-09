// import Home from "./pages/Home";
// import Shop from "./pages/Shop";

// const App = () => {
//   return (
//     <div>
//       <Home />
//       <Shop />
//     </div>
//   );
// };

// export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header className='bg-black' />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
