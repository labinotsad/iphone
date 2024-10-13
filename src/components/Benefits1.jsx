import { useState, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { benefits1 } from "../constants";
import { CartContext } from "../context/CartContext"; // Adjust the import path as necessary
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { Link } from "react-router-dom";

const Benefits1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(CartContext); // Access the CartContext

  const filteredBenefits = benefits1.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
      y: -50,
      ease: "power1",
      scale: 1,
    });
  }, []);

  const handleAddToCart = (item) => {
    const isLoggedIn = localStorage.getItem("isloggedin"); // Check if user is logged in

    if (!isLoggedIn) {
      alert("You need to login first."); // Alert if not logged in
    } else {
      addToCart(item); // Add item to the cart
      alert(`${item.title} has been added to your cart.`); // Alert confirming addition
    }
  };

  return (
    <section id='features'>
      <div className='container relative z-2'>
        <h3 id='hero' className='h3 mt-10 text-center mb-10 opacity-0'>
          Explore the full models.
        </h3>

        {/* Input Kërkimi */}
        <input
          type='text'
          placeholder='Search for products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=' w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black mb-[4rem]'
        />
        <Link
          to='/shop'
          reloadDocument
          className='ml-[1rem] w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white py-[10px] px-[14px]'
        >
          Clear
        </Link>

        <div className='flex flex-wrap gap-10 mb-10'>
          {filteredBenefits.map((item) => (
            <div
              className='block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]'
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className='relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none'>
                <h5 className='h5 mb-5'>{item.title}</h5>
                <p className='body-2 mb-6 text-n-3'>{item.text}</p>

                <div className='flex items-center mt-auto'>
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />

                  <button
                    className='ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider pointer-events-auto'
                    onClick={() => handleAddToCart(item)} // Call the new function
                  >
                    Add to Cart
                  </button>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className='absolute inset-0.5 bg-n-8'
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className='absolute inset-0 opacity-0 transition-opacity hover:opacity-60'>
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
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits1;
