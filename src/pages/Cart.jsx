import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Make sure this path is correct
import Arrow from "../assets/svg/Arrow"; // Ensure this is the correct path
import ClipPath from "../assets/svg/ClipPath"; // Ensure this is the correct path

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Destructure your context

  // Debugging: Log the cart items to see if they are being fetched correctly
  console.log("Cart Items:", cartItems);

  return (
    <section id='cart'>
      <div className='container relative z-2'>
        <h3 className='h3 mt-10 text-center mb-10'>Your Shopping Cart</h3>

        <div className='flex flex-wrap gap-10 mb-10'>
          {cartItems.length === 0 ? (
            <p className='text-center'>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                className='block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]'
                style={{ backgroundImage: `url(${item.backgroundUrl})` }} // Ensure item has a backgroundUrl
                key={item.id}
              >
                <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none'>
                  <h5 className='h5 mb-5'>{item.title}</h5>
                  <p className='body-2 mb-6 text-n-3'>{item.text}</p>
                  <p className='font-bold text-lg'>{item.price}</p>

                  <div className='flex items-center mt-auto'>
                    <img
                      src={item.iconUrl}
                      width={48}
                      height={48}
                      alt={item.title}
                    />
                    <button
                      onClick={() => {
                        removeFromCart(item.id); // Call to remove item from cart
                      }}
                      className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                    >
                      Remove from Cart
                    </button>
                    <Arrow />
                  </div>
                </div>

                <div
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
