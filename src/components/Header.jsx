import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isloggedin", false);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [user, setUser] = useLocalStorage("user", "");
  const navigator = useNavigate();

  const handleSignOut = (e) => {
    setIsLoggedIn(false);
    setUser("");
    navigator("/");
  };

  return (
    <header className='h-24 flex items-center bg-slate-200'>
      <div className='container mx-auto flex items-center justify-between'>
        <span className='text-3xl text-gray-500'>
          <i className='fa-solid fa-film'></i> Movie Shop
        </span>
        <nav>
          <ul className='flex items-center gap-4'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/shop'>Shop</Link>
            </li>
            <li>
              <Link to='/cart'>Cart ({cart.length})</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <a href='#' onClick={handleSignOut}>
                    <i className='fa-solid fa-right-from-bracket'></i>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
