import { useState, useEffect } from "react";

const OrderForm = ({ selectedItem, onSubmit, closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    // Retrieve user info from localStorage
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          name: user.name || "",
          email: user.email || "",
        }));
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
    }

    // Automatically set current date and time
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM format

    setFormData((prevData) => ({
      ...prevData,
      date: currentDate,
      time: currentTime,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedItem.id, formData);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
      <div
        className='bg-black bg-opacity-75 absolute inset-0'
        onClick={closeForm}
      ></div>
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
              className='w-full p-2 border border-gray-300 rounded text-black'
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
              className='w-full p-2 border border-gray-300 rounded text-black'
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
              className='w-full p-2 border border-gray-300 rounded text-black'
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
              className='w-full p-2 border border-gray-300 rounded text-black'
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
  );
};

export default OrderForm;
