import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Correct path

import ClipPath from "../assets/svg/ClipPath"; // Ensure this is correct

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext); // Destructure your context

  return (
    <section id='cart'>
      <div className='container relative z-2'>
        <h3 className='h3 mt-10 text-center mb-10'>Your Shopping Cart</h3>

        <div className='md:grid md:grid-cols-2 gap-10 mb-10'>
          {cartItems.length === 0 ? (
            <p className='text-center'>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                className='grid grid-cols-2 relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[1200px] '
                style={{ backgroundImage: `url(${item.backgroundUrl} )` }}
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
                  <p className=' body-2 mb-4 text-n-3'>{item.overview}</p>
                  <p className='font-bold text-lg'>
                    €{item.price * item.quantity}
                    {/* This multiplies the price by the quantity */}
                  </p>

                  <div className='flex items-center mt-[1rem]'>
                    {/* Quantity Controls */}
                    <div className='flex items-center'>
                      <button
                        className='mr-2 p-2 pointer-events-auto '
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className='px-4'>{item.quantity}</span>
                      <button
                        className='ml-2 p-2 pointer-events-auto '
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-between mt-8 '>
                    {" "}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                    >
                      Remove from Cart
                    </button>
                    <button className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'>
                      Buy it{" "}
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
