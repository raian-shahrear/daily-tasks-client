import React from 'react';
import { FaLinkedin, FaTwitter, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="relative mt-16 dark:bg-indigo-300">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-white shadow-inner shadow-indigo-100 dark:shadow-none dark:text-indigo-300"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 py-8 dark:pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex flex-col items-center justify-between pb-8 dark:pb-16 sm:flex-row">
          <p className="text-gray-900 font-medium">
           &copy; Copyright 2022 DAILY TASKS. All rights reserved.
          </p>
          <div className="flex items-center mt-8 lg:mt-4 space-x-4 sm:mt-0">
            <a
              href="https://www.linkedin.com/in/raian-shahrear/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors text-2xl duration-300 text-gray-900 hover:text-indigo-900"
            >
              <FaLinkedin/>
            </a>
            <a
              href="https://twitter.com/raian_shahrear"
              target="_blank"
              rel="noreferrer"
              className="transition-colors text-2xl duration-300 text-gray-900 hover:text-indigo-900"
            >
              <FaTwitter/>
            </a>
            <a
              href="https://fb.com/raian.shahrear.9"
              target="_blank"
              rel="noreferrer"
              className="transition-colors text-2xl duration-300 text-gray-900 hover:text-indigo-900"
            >
              <FaFacebookSquare/>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;