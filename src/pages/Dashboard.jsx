import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";

const Dashboard = () => {
  const [user] = useLocalStorage("user", null);
  const [isLoggedIn] = useLocalStorage("isloggedin", false);
  const [orders] = useLocalStorage("orders", []);
  const navigator = useNavigate();
  const [myOrders, setMyOrders] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const { purchasedItems, addToCart, removeFromPurchasedItems } =
    useContext(CartContext);

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigator("/login");
      return;
    }

    // Filter orders only if user and orders are stable
    if (user && orders.length > 0) {
      const filteredOrders = orders.filter((order) => order.user === user);
      setMyOrders(filteredOrders);
    }
  }, [isLoggedIn, navigator, orders, user]); // Ensure stability of dependencies

  const handleBuyItAgain = (item) => {
    addToCart(item);
    showAlert(`${item.title} added to cart successfully!`);
    navigator("/cart");
  };

  const handleRemoveItem = (item) => {
    removeFromPurchasedItems(item.id);
    showAlert(`${item.title} removed from purchased items!`);
  };

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => {
      setAlert({ show: false, message: "" });
    }, 2000);
  };

  useGSAP(() => {
    animateWithGsap("#hero", {
      y: -50,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section id='dashboard'>
      <div className='container relative z-2'>
        <h3 id='hero' className='h3 mt-10 text-center mb-10 opacity-0'>
          Your Purchased Items
        </h3>

        {alert.show && (
          <div className='fixed inset-0 flex justify-center items-center z-50'>
            <div className='bg-black bg-opacity-50 absolute inset-0'></div>
            <div className='bg-white text-center p-6 rounded-lg shadow-lg relative z-10'>
              <p className='text-lg text-green-600'>{alert.message}</p>
            </div>
          </div>
        )}

        <div className='md:grid md:grid-cols-2 gap-10 mb-10'>
          {purchasedItems.length === 0 ? (
            <p className='text-center'>You have no purchased items.</p>
          ) : (
            purchasedItems.map((item) => (
              <div
                className='grid grid-cols-2 relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[1200px]'
                style={{ backgroundImage: `url(${item.backgroundUrl})` }}
                key={item.id}
              >
                <div>
                  <img
                    className='rounded-3xl'
                    src={item.image}
                    alt=''
                    width={320}
                  />
                </div>
                <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]'>
                  <div className='flex-grow'>
                    <h5 className='h5 mb-2'>{item.title}</h5>
                    <p className='body-2 mb-4 text-n-3'>{item.overview}</p>
                  </div>
                  <div className='mt-auto'>
                    <p className='font-bold text-lg'>
                      €{item.price * item.quantity}
                    </p>
                    <p className='text-md'>Quantity: {item.quantity}</p>
                  </div>
                  <div className='flex justify-between mt-8'>
                    <button
                      className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove it
                    </button>
                    <button
                      className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                      onClick={() => handleBuyItAgain(item)}
                    >
                      Buy it Again
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
