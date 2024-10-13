import { useLocalStorage } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [users] = useLocalStorage("users", []);
  const [user, setUser] = useLocalStorage("user", []);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isloggedin", false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigator = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigator("/dashboard");
  }, [isLoggedIn, navigator]);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = e.target.elements;
    const email = data["email"].value;
    const password = data["password"].value;

    if (users.length > 0) {
      const userExists = users.filter(
        (user) => user.email === email && user.password === password
      );

      if (userExists.length) {
        setIsLoggedIn(true);
        setUser(email);
        navigator("/dashboard");
      } else {
        setAlert({
          show: true,
          message: "Invalid credentials!",
          type: "error",
        });
      }
    } else {
      setAlert({
        show: true,
        message: "Please create your account first!",
        type: "error",
      });
    }
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <section className='min-h-screen flex justify-center items-center bg-black relative'>
      {/* Alert Modal */}
      {alert.show && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
          <div className='w-[400px] p-6 bg-white shadow-lg rounded-lg relative'>
            <h3
              className={`text-2xl font-semibold mb-4 ${
                alert.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {alert.type === "error" ? "Error" : "Success"}
            </h3>
            <p className='text-lg mb-6 text-black'>{alert.message}</p>
            <button
              onClick={closeAlert}
              className='bg-[#0ef] text-black px-4 py-2 rounded-lg w-full hover:bg-teal-400'
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className='w-[400px] p-10 bg-black shadow-[0_0_10px_#0ef] rounded-xl'>
        <h2 className='text-3xl text-center text-white mb-8'>Login</h2>
        <form id='login' method='POST' onSubmit={handleLogin}>
          <div className='relative mb-6'>
            <input
              type='email'
              name='email'
              autoComplete='email'
              placeholder='Enter email address'
              className='w-full h-12 text-lg text-white bg-transparent border-b-2 border-gray-300 outline-none placeholder-gray-500 px-4 focus:border-[#0ef]'
              required
            />
          </div>
          <div className='relative mb-6'>
            <input
              type='password'
              name='password'
              autoComplete='current-password'
              placeholder='Enter password'
              className='w-full h-12 text-lg text-white bg-transparent border-b-2 border-gray-300 outline-none placeholder-gray-500 px-4 focus:border-[#0ef]'
              required
            />
          </div>
          <div className='remember'>
            <label className='text-white text-sm'>
              <input className='accent-[#0ef]' type='checkbox' /> Remember me
            </label>
          </div>

          <button
            type='submit'
            className='w-full h-12 bg-[#0ef] text-black font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-teal-400'
          >
            Login
          </button>
          <div className='signUp-link text-sm text-center mt-4'>
            <p className='text-white'>
              Don't have an account?{" "}
              <span className='text-[#0ef] cursor-pointer'>
                <a href='./Register'>Sign Up</a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
