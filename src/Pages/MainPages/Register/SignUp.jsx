import React from 'react';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 bg-gray-200 dark:bg-gray-800 text-indigo-900 dark:text-indigo-500">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label for="name" className="block text-gray-900 dark:text-indigo-50">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label for="photo" className="block text-gray-900 dark:text-indigo-50">
              Your Photo
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label for="email" className="block text-gray-900 dark:text-indigo-50">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Valid email"
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
            <p className='text-xs text-gray-500 dark:text-gray-400 pt-0.5 font-medium'>[Hints: password must have 1 special character, 1 number, 1 uppercase and 6 letter long]</p>
          </div>
          <button className="block w-full p-3 text-center hover:text-gray-900 hover:bg-indigo-300 font-bold tracking-wide transition-all duration-300 text-indigo-50 bg-indigo-500">
            Sign Up
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">
            Quick Sign up with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button aria-label="sign up with Google" className="p-3 text-xl hover:text-indigo-500">
            <FaGoogle/>
          </button>
          <button aria-label="sign up with Facebook" className="p-3 text-xl hover:text-indigo-500">
            <FaFacebookF/>
          </button>
        </div>
        <p className="text-sm text-center sm:px-6 text-gray-500 dark:text-gray-400">
          Already have an account? Please <Link to="/login" className="font-medium text-indigo-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;