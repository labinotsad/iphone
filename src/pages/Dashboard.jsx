import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Adjust the import path
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const { purchasedItems, addToCart, removeFromPurchasedItems } =
    useContext(CartContext); // Get purchased items and addToCart function
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBuyItAgain = (item) => {
    addToCart(item); // Add item back to cart
    navigate("/cart"); // Navigate to cart page
  };

  return (
    <section id='dashboard'>
      <div className='container relative z-2'>
        <h3 className='h3 mt-10 text-center mb-10'>Your Purchased Items</h3>

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
                  </p>{" "}
                  {/* Show total price based on quantity */}
                  <p className='text-md'>Quantity: {item.quantity}</p>{" "}
                  {/* Display quantity */}
                  <div className='flex justify-between mt-8'>
                    <button
                      className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                      onClick={() => removeFromPurchasedItems(item.id)} // Call to remove from purchased items
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
