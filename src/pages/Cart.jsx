import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import OrderForm from "../components/OrderForm";
import Alert from "../components/Alert";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";

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

  const handleSubmitOrder = (itemId, formData) => {
    buyIt(itemId, formData);
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

        <Alert show={alert.show} message={alert.message} />

        <div className='md:grid md:grid-cols-2 gap-10 mb-10'>
          {cartItems.length === 0 ? (
            <p className='text-center'>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveFromCart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onBuy={handleBuyIt}
              />
            ))
          )}
        </div>

        {showForm && (
          <OrderForm
            selectedItem={selectedItem}
            onSubmit={handleSubmitOrder}
            closeForm={() => setShowForm(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Cart;
