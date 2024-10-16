import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    time: "",
    date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".form-container") === null) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);
    showAlert(`${item.title} removed from cart successfully!`);
  };

  const handleBuyIt = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buyIt(selectedItem.id, formData);
    showAlert("Order placed successfully! Redirecting to dashboard...");
    setShowForm(false);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
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
        {/* Form Overlay */}
        {showForm && (
          <div className='fixed inset-0 flex justify-center items-center z-50'>
            <div className='bg-black bg-opacity-75 absolute inset-0'></div>
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg relative z-10 w-11/12 md:w-1/3 form-container'>
              <h4 className='text-lg font-bold mb-4 text-center'>
                Order Details for {selectedItem.title}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label className='block mb-1' htmlFor='name'>
                    Name:
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder='Enter your name'
                    className='w-full p-2 border border-gray-300 rounded  text-black'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block mb-1' htmlFor='email'>
                    Email:
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder='Enter your email'
                    className='w-full p-2 border border-gray-300 rounded  text-black'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block mb-1' htmlFor='street'>
                    Street:
                  </label>
                  <input
                    type='text'
                    id='street'
                    name='street'
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    placeholder='Enter your street'
                    className='w-full p-2 border border-gray-300 rounded  text-black'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block mb-1' htmlFor='date'>
                    Date:
                  </label>
                  <input
                    type='date'
                    id='date'
                    name='date'
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className='w-full p-2 border border-gray-300 rounded text-black'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block mb-1' htmlFor='time'>
                    Time:
                  </label>
                  <input
                    type='time'
                    id='time'
                    name='time'
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className='w-full p-2 border border-gray-300 rounded  text-black  '
                  />
                </div>
                <button
                  type='submit'
                  className='bg-blue-500 text-white border border-r-2 p-2 rounded w-full'
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
