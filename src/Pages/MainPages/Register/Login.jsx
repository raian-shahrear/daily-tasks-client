import React, { useContext, useState } from "react";
import { FaGoogle, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AuthContext";
import toast from 'react-hot-toast';


const Login = () => {
  const { signInUser, resetPassword, googleUser, facebookUser } =
    useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isPassVisible, setISPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // Login account
  const handleLogin = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setErrorMessage("");
        navigate(from, { replace: true });
        setIsLoading(false);
        toast.success("Log in successful!", {duration: 2000});
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  };

  const handleResetPass = () => {
    if (email) {
      resetPassword(email)
        .then(() => {
          alert("Please check your email to reset password!");
          setErrorMessage("");
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage(err.message);
        });
    } else {
      setErrorMessage("Please provide a valid email!");
    }
  };

  // google user
  const handleGoogleUser = () => {
    googleUser()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setErrorMessage("");
        navigate(from, { replace: true });
        toast.success("Successfully Login through Google!", {duration: 2000});
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      });
  };

  // facebook user
  const handleFacebookUser = () => {
    facebookUser()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setErrorMessage("");
        navigate(from, { replace: true });
        toast.success("Successfully Login through Facebook!", {duration: 2000});
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      });
  };

  return (
    <section className="h-[680px] flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 bg-gray-200 dark:bg-gray-800 text-indigo-900 dark:text-indigo-500">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div>
          {errorMessage && (
            <p className="text-sm font-medium text-red-500 mb-6 text-center">
              {errorMessage}
            </p>
          )}
        </div>
        <form
          onSubmit={handleLogin}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="email"
              className="block text-gray-900 dark:text-indigo-50"
            >
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              onBlur={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Valid Email"
              required
              className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="password"
              className="block text-gray-900 dark:text-indigo-50"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={isPassVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="******"
                required
                className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
              />
              <div
                onClick={() => setISPassVisible(!isPassVisible)}
                className="absolute bottom-3 right-2 text-lg text-gray-900 dark:text-gray-100"
              >
                {isPassVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="flex justify-end text-sm text-gray-400">
              <p
                onClick={handleResetPass}
                className="text-gray-900 font-medium dark:text-indigo-50 hover:underline"
              >
                Forgot Password?
              </p>
            </div>
          </div>
          <div className="relative">
            <button className="block w-full p-3 text-center hover:text-gray-900 hover:bg-indigo-300 font-bold tracking-wide transition-all duration-300 text-indigo-50 bg-indigo-500">
              Login
            </button>
            {isLoading && (
              <div className="absolute w-8 h-8 border-2 bottom-2 left-28 border-dashed rounded-full animate-spin border-indigo-50"></div>
            )}
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleUser}
            aria-label="Log in with Google"
            className="p-3 text-xl hover:text-indigo-500"
          >
            <FaGoogle />
          </button>
          <button
            onClick={handleFacebookUser}
            aria-label="Log in with Facebook"
            className="p-3 text-xl hover:text-indigo-500"
          >
            <FaFacebookF />
          </button>
        </div>
        <p className="text-sm text-center sm:px-6 text-gray-500 dark:text-gray-400">
          Don't have an account? Please{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
