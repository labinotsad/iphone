import { useLocalStorage } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [users, setUsers] = useLocalStorage("users", []);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isloggedin", false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and register
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/shop");
  }, [isLoggedIn, navigate]);

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
        navigate("/shop");
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

  const handleRegister = (e) => {
    e.preventDefault();
    const data = e.target.elements;
    const fullname = data["fullname"].value;
    const email = data["email"].value;
    const password1 = data["password1"].value;
    const password2 = data["password2"].value;

    if (password1 !== password2) {
      setAlert({
        show: true,
        type: "error",
        message: "Passwords must match!",
      });
    } else {
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        setAlert({
          show: true,
          type: "error",
          message: `${email} is already in use!`,
        });
      } else {
        setUsers([...users, { fullname, email, password: password1 }]);
        setAlert({
          show: true,
          type: "success",
          message: "Account created successfully.",
        });
        // Navigate to login after 2 seconds
        setTimeout(() => {
          setIsLogin(true);
          setAlert({ show: false, type: "", message: "" });
        }, 2000);
      }
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
        {isLogin ? (
          <LoginForm handleLogin={handleLogin} setIsLogin={setIsLogin} />
        ) : (
          <RegisterForm
            handleRegister={handleRegister}
            setIsLogin={setIsLogin}
          />
        )}
      </div>
    </section>
  );
}

const LoginForm = ({ handleLogin, setIsLogin }) => (
  <>
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
      <button
        type='submit'
        className='w-full h-12 bg-[#0ef] text-black font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-teal-400'
      >
        Login
      </button>
      <div className='signUp-link text-sm text-center mt-4'>
        <p className='text-white'>
          Don't have an account?{" "}
          <span
            className='text-[#0ef] cursor-pointer'
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </span>
        </p>
      </div>
    </form>
  </>
);

const RegisterForm = ({ handleRegister, setIsLogin }) => (
  <>
    <h2 className='text-3xl text-center text-white mb-8'>Register</h2>
    <form id='register' method='POST' onSubmit={handleRegister}>
      <div className='relative mb-6'>
        <input
          type='text'
          name='fullname'
          placeholder='Enter fullname'
          className='w-full h-12 text-lg text-white bg-transparent border-b-2 border-gray-300 outline-none placeholder-gray-500 px-4 focus:border-[#0ef]'
          required
        />
      </div>
      <div className='relative mb-6'>
        <input
          type='email'
          name='email'
          placeholder='Enter email address'
          className='w-full h-12 text-lg text-white bg-transparent border-b-2 border-gray-300 outline-none placeholder-gray-500 px-4 focus:border-[#0ef]'
          required
        />
      </div>
      <div className='relative mb-6'>
        <input
          type='password'
          name='password1'
          autoComplete='new-password'
          placeholder='Enter password'
          className='w-full h-12 text-lg text-white bg-transparent border-b-2 border-gray-300 outline-none placeholder-gray-500 px-4 focus:border-[#0ef]'
          required
        />
      </div>
      <div className='relative mb-6'>
        <input
          type='password'
          name='password2'
          autoComplete='new-password'
          placeholder='Confirm password'
          className='w-full h-12 text-lg text-white bg-transparent border-b-2 border-gray-300 outline-none placeholder-gray-500 px-4 focus:border-[#0ef]'
          required
        />
      </div>
      <button
        type='submit'
        className='w-full h-12 bg-[#0ef] text-black font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-teal-400'
      >
        Sign Up
      </button>
      <div className='signUp-link text-sm text-center mt-4'>
        <p className='text-white'>
          You have an account?{" "}
          <span
            className='text-[#0ef] cursor-pointer'
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </span>
        </p>
      </div>
    </form>
  </>
);

export default Auth;
