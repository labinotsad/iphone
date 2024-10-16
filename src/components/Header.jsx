import { Link, useNavigate } from "react-router-dom";
import { appleImg } from "../utils";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"; // Import CartContext

const Nav = () => {
  const { cartItems } = useContext(CartContext); // Get cartItems from context
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isloggedin", false);
  const [user, setUser] = useLocalStorage("user", "");
  const navigator = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const handleSignOut = () => {
    setShowAlert(true);
  };

  const confirmSignOut = () => {
    setIsLoggedIn(false);
    setUser("");
    navigator("/");
    setShowAlert(false);
  };

  const cancelSignOut = () => {
    setShowAlert(false);
  };

  return (
    <header className='sticky top-0 left-0 w-full h-24  shadow-md z-50 flex items-center'>
      <div className='container mx-auto flex items-center justify-between '>
        <img src={appleImg} alt='Apple' width={14} height={18} />
        <nav>
          <ul className='flex items-center gap-4'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/shop'>Shop</Link>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <Link to='/cart'>Cart ({cartItems.length})</Link>
                </li>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className='text-white'>
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/auth'>Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Custom Alert */}
      {showAlert && (
        <div className='fixed inset-0 flex justify-center items-center z-50'>
          <div className='bg-black bg-opacity-50 absolute inset-0'></div>
          <div className='bg-white text-center p-6 rounded-lg shadow-lg relative z-10'>
            <p className='text-lg text-red-600'>
              Are you sure you want to sign out?
            </p>
            <div className='mt-4'>
              <button
                onClick={confirmSignOut}
                className='mr-2 px-4 py-2 bg-gray-300 text-black rounded'
              >
                Yes
              </button>
              <button
                onClick={cancelSignOut}
                className='px-4 py-2 bg-gray-300 text-black rounded'
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
