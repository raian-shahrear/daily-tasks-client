import React, { useContext } from "react";
import "./Home.css";
import Lottie from "lottie-react";
import background from "../../../Resources/background_bubble.json";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { UserContext } from "../../../Context/AuthContext";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="h-[680px] px-4 py-44 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 relative">
      <div className="lottie-background absolute left-1/2 top-[355px] md:top-[330px] w-[650px] md:w-[700px]">
        <Lottie animationData={background} loop={true} />;
      </div>

      <div className="bg-light-home dark:bg-dark-home py-20 px-16 md:px-32 grid grid-cols-1 lg:grid-cols-2 items-center content-evenly lg:justify-items-end">
        <div className="text-center lg:text-start">
          <h1 className="text-2xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-50">
            Hake Your Time! <br /> Follow{" "}
            <span className="text-indigo-500 dark:text-indigo-400">
              Daily Tasks
            </span>
          </h1>
          <p className="text-indigo-900 dark:text-indigo-50 font-medium md:text-lg mt-3 lg:mt-6">
            Are you worried about your tasks, don't want to miss? This platform
            offers to manage your task from anywhere at anytime.
          </p>
        </div>
        <div className="mt-6 text-indigo-900 dark:text-indigo-50 ">
          <h2 className="text-xl font-semibold mb-6 lg:animate-bounce flex items-center justify-center gap-2">
            <p>{user?.uid ? "Lets Explore Daily Tasks" : "Before Adding Task"}</p>
            <FaArrowDown className="text-indigo-500 dark:text-indigo-400" />
          </h2>
          {user?.uid ? (
            <div className="flex justify-center items-center gap-6">
              <Link to="/add-task" className="text-indigo-900 dark:text-indigo-300 font-semibold text-lg border-2 border-indigo-900 dark:border-indigo-300 px-2 py-1  hover:text-indigo-700 hover:border-indigo-700 dark:hover:text-indigo-100 dark:hover:border-indigo-100 transition-all duration-300">Add Task</Link>
              <Link to="/my-tasks" className="text-indigo-900 dark:text-indigo-300 font-semibold text-lg border-2 border-indigo-900 dark:border-indigo-300 px-2 py-1  hover:text-indigo-700 hover:border-indigo-700 dark:hover:text-indigo-100 dark:hover:border-indigo-100 transition-all duration-300">My Tasks</Link>
              <Link to="/completed-tasks" className="text-indigo-900 dark:text-indigo-300 font-semibold text-lg border-2 border-indigo-900 dark:border-indigo-300 px-2 py-1  hover:text-indigo-700 hover:border-indigo-700 dark:hover:text-indigo-100 dark:hover:border-indigo-100 transition-all duration-300">Completed Tasks</Link>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-6">
              <Link
                to="/login"
                className="dark:text-indigo-200 border-2 border-indigo-900 dark:border-indigo-200 px-8 py-2 font-bold tracking-wide transition-all duration-300 hover:text-indigo-50 hover:bg-indigo-500 hover:border-transparent hover:-translate-y-1 dark:hover:border-transparent"
              >
                Login
              </Link>
              <p className="text-lg font-semibold">or</p>
              <Link
                to="/signup"
                className="text-indigo-500 border-2 border-indigo-500 px-6 py-2 font-bold tracking-wide transition-all duration-300 hover:text-indigo-50 hover:bg-indigo-500 hover:border-transparent hover:-translate-y-1"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
