import { Link, useNavigate } from "react-router-dom";
import { appleImg } from "../utils";
import { useLocalStorage } from "@uidotdev/usehooks";

const Nav = () => {
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
    <header className='h-24 flex items-center'>
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
                    <i className='fa-solid fa-right-from-bracket text-white'></i>
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
};

export default Nav;
