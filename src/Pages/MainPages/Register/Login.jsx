import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 bg-gray-200 dark:bg-gray-800 text-indigo-900 dark:text-indigo-500">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label for="email" className="block text-gray-900 dark:text-indigo-50">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Valid Email"
              className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label for="password" className="block text-gray-900 dark:text-indigo-50">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            />
            <div className="flex justify-end text-sm text-gray-400">
              <button className="text-gray-900 font-medium dark:text-indigo-50 hover:underline">
                Forgot Password?
              </button>
            </div>
          </div>
          <button className="block w-full p-3 text-center hover:text-gray-900 hover:bg-indigo-300 font-bold tracking-wide transition-all duration-300 text-indigo-50 bg-indigo-500">
            Login
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 text-xl hover:text-indigo-500">
            <FaGoogle/>
          </button>
          <button aria-label="Log in with Facebook" className="p-3 text-xl hover:text-indigo-500">
            <FaFacebookF/>
          </button>
        </div>
        <p className="text-sm text-center sm:px-6 text-gray-500 dark:text-gray-400">
          Don't have an account? Please <Link to="/signup" className="font-medium text-indigo-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
