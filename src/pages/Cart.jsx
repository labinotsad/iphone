import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Make sure this path is correct

import ClipPath from "../assets/svg/ClipPath"; // Ensure this is the correct path

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Destructure your context

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
                style={{ backgroundImage: `url(${item.backgroundUrl} )` }} // Ensure item has a backgroundUrl
                key={item.id}
              >
                <div>
                  <img
                    className=' rounded-3xl'
                    src={item.image}
                    alt=''
                    width={300}
                  />
                </div>
                <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none'>
                  <h5 className='h5 mb-5 '>{item.title}</h5>
                  <p className=' body-2 mb-6 text-n-3'>{item.overview}</p>
                  <p className='font-bold text-lg'>{item.price}</p>

                  <div className='flex items-center mt-auto'>
                    <button
                      onClick={() => {
                        removeFromCart(item.id); // Call to remove item from cart
                      }}
                      className='mr-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                    >
                      Remove from Cart
                    </button>
                    {/* <Arrow /> */}
                    <button className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'>
                      Buy it{" "}
                    </button>
                  </div>
                </div>

                {/* <div
                  className='absolute inset-0 opacity-0 transition-opacity hover:opacity-60'
                  style={{ clipPath: "url(#benefits)" }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className='w-full object-cover'
                    />
                  )}
                </div> */}

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
