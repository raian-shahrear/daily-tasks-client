import React, { useContext, useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { UserContext } from "../../../Context/AuthContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, signOutUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme set
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Successfully Sign Out!", { duration: 2000 });
      })
      .catch((err) => console.error(err));
  };

  const navItems = (
    <React.Fragment>
      {!user?.uid ? (
        <>
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 font-bold tracking-wide"
                  : "text-indigo-900 dark:text-indigo-200 font-bold tracking-wide transition-all duration-300 hover:text-indigo-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-50 bg-indigo-500 px-8 py-2 font-bold tracking-wide"
                  : "text-indigo-900 bg-indigo-200 px-8 py-2 font-bold tracking-wide transition-all duration-300 hover:text-indigo-50 hover:bg-indigo-500"
              }
            >
              Login
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-bold tracking-wide"
                : "text-indigo-900 dark:text-indigo-200 font-bold tracking-wide transition-all duration-300 hover:text-indigo-500"
            }
          >
            Home
          </NavLink>
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/add-task"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 font-bold tracking-wide"
                  : "text-indigo-900 dark:text-indigo-200 font-bold tracking-wide transition-all duration-300 hover:text-indigo-500"
              }
            >
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/my-tasks"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 font-bold tracking-wide"
                  : "text-indigo-900 dark:text-indigo-200 font-bold tracking-wide transition-all duration-300 hover:text-indigo-500"
              }
            >
              My Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/completed-tasks"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 font-bold tracking-wide"
                  : "text-indigo-900 dark:text-indigo-200 font-bold tracking-wide transition-all duration-300 hover:text-indigo-500"
              }
            >
              Completed Tasks
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleSignOut();
              }}
              className="text-gray-900 bg-gray-200 px-5 py-2 font-bold tracking-wide transition-all duration-300 hover:text-gray-100 hover:bg-gray-500"
            >
              Sign Out
            </button>
          </li>
        </>
      )}
    </React.Fragment>
  );

  return (
    <div className="shadow-md shadow-indigo-100 dark:shadow-none dark:bg-gray-800">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <FaPaperPlane className="text-2xl text-indigo-500 dark:text-indigo-300" />
            <span className="ml-2 text-xl font-bold tracking-wide text-indigo-900 dark:text-indigo-500 uppercase">
              Daily Tasks
            </span>
          </a>
          <ul className="items-center hidden gap-6 lg:flex">
            <li>
              <button onClick={handleTheme} className="text-2xl mt-2 mr-4">
                {theme === "light" ? (
                  <BsFillSunFill className="text-yellow-500" />
                ) : (
                  <BsMoonFill className="text-yellow-200" />
                )}
              </button>
            </li>
            {navItems}
            {user?.uid && (
              <li>
                <img
                  src={user?.photoURL}
                  alt="profile"
                  title={user?.displayName}
                  className="w-16 rounded-full cursor-pointer border-2 border-indigo-500"
                />
              </li>
            )}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded hover:bg-indigo-200 focus:bg-indigo-200 focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600 dark:text-gray-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm shadow-indigo-100 dark:bg-gray-900">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <FaPaperPlane className="text-2xl text-indigo-500" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-indigo-900 uppercase">
                          Daily Tasks
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-indigo-200 focus:bg-indigo-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className="w-5 text-gray-600 dark:text-gray-500"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav className="flex justify-between">
                    <ul className="space-y-4">{navItems}</ul>
                    <div>
                      <button
                        onClick={handleTheme}
                        className="text-2xl mt-2 mr-4"
                      >
                        {theme === "light" ? (
                          <BsFillSunFill className="text-yellow-500" />
                        ) : (
                          <BsMoonFill className="text-yellow-200" />
                        )}
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
