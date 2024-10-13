import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext"; // Adjust the import path
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useLocalStorage } from "@uidotdev/usehooks";

const Dashboard = () => {
  const [user, setUser] = useLocalStorage("user", []);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isloggedin", false);
  const [orders, setOrders] = useLocalStorage("orders", []);
  const navigator = useNavigate();
  const [myOrders, setMyOrders] = useState();
  const [alert, setAlert] = useState({ show: false, message: "" }); // Alert state
  const { purchasedItems, addToCart, removeFromPurchasedItems } =
    useContext(CartContext); // Get purchased items and addToCart function

  useEffect(() => {
    if (!isLoggedIn) navigator("/login");

    setMyOrders([...orders.filter((order) => order.user === user)]);
  }, [isLoggedIn, navigator, orders, user]);

  const handleBuyItAgain = (item) => {
    addToCart(item); // Add item back to cart
    showAlert(`${item.title} added to cart successfully!`);
    navigator("/cart"); // Navigate to cart page
  };

  const handleRemoveItem = (item) => {
    removeFromPurchasedItems(item.id); // Remove from purchased items
    showAlert(`${item.title} removed from purchased items!`);
  };

  const showAlert = (message) => {
    setAlert({ show: true, message });

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "" });
    }, 2000);
  };

  return (
    <section id='dashboard'>
      <div className='container relative z-2'>
        <h3 className='h3 mt-10 text-center mb-10'>Your Purchased Items</h3>

        {/* Alert */}
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
                <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none'>
                  <h5 className='h5 mb-2'>{item.title}</h5>
                  <p className='body-2 mb-4 text-n-3'>{item.overview}</p>
                  <p className='font-bold text-lg'>
                    €{item.price * item.quantity}
                  </p>
                  <p className='text-md'>Quantity: {item.quantity}</p>
                  <div className='flex justify-between mt-8'>
                    <button
                      className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                      onClick={() => handleRemoveItem(item)} // Call to remove from purchased items
                    >
                      Remove it
                    </button>
                    <button
                      className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                      onClick={() => handleBuyItAgain(item)} // Call the buy it again function
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
