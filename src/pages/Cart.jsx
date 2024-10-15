import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ClipPath from "../assets/svg/ClipPath";
import { animateWithGsap } from "../utils/animations";

import { useGSAP } from "@gsap/react";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    buyIt,
  } = useContext(CartContext);

  const [alert, setAlert] = useState({ show: false, message: "" });

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);
    showAlert(`${item.title} removed from cart successfully!`);
  };

  const handleBuyIt = (item) => {
    buyIt(item.id);
    showAlert(`${item.title} purchased successfully!`);
  };

  const showAlert = (message) => {
    setAlert({ show: true, message });

    setTimeout(() => {
      setAlert({ show: false, message: "" });
    }, 2000);
  };
  useGSAP(() => {
    animateWithGsap("#hero", {
      y: 2,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section id='cart'>
      <div className='container relative z-2'>
        <h3 id='hero' className='h3 mt-10 text-center mb-10 opacity-0'>
          Your Shopping Cart
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
          {cartItems.length === 0 ? (
            <p className='text-center'>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
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

                  <div className='flex items-center mt-[1rem]'>
                    <div className='flex items-center'>
                      <button
                        className='mr-2 p-2 pointer-events-auto'
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className='px-4'>{item.quantity}</span>
                      <button
                        className='ml-2 p-2 pointer-events-auto'
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-between mt-8'>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                    >
                      Remove from Cart
                    </button>
                    <button
                      onClick={() => handleBuyIt(item)}
                      className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                    >
                      Buy it
                    </button>
                  </div>
                </div>

                <ClipPath />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
