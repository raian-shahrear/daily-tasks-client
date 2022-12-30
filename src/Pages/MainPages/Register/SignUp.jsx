import React, { useContext, useState } from "react";
import { FaGoogle, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AuthContext";
import toast from 'react-hot-toast';


const SignUp = () => {
  const { createUser, updateUser, googleUser, facebookUser, signOutUser } =
    useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPassVisible, setISPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Create an account
  const handleSignUp = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;

    // using Regex for email verification
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
      setErrorMessage("Please set email in right format");
      setIsLoading(false);
      return;
    }
    // using Regex for password verification
    if (!/^(?=.*[A-Z])/.test(password)) {
      setErrorMessage("Password should have at least one capital letter");
      setIsLoading(false);
      return;
    }
    if (!/^(?=.*\d)/.test(password)) {
      setErrorMessage("Password should have at least one digit");
      setIsLoading(false);
      return;
    }
    if (!/^(?=.*[!#$%&@? "])/.test(password)) {
      setErrorMessage("Password should have at least one special character");
      setIsLoading(false);
      return;
    }
    if (!/^(?=.{6,})/.test(password)) {
      setErrorMessage("Password should have at least 6 characters");
      setIsLoading(false);
      return;
    }
    setErrorMessage("");

    const imageHostKey = process.env.REACT_APP_IMGBB_KEY;
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData?.success) {
          // create user
          createUser(email, password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              form.reset();
              updateUserInfo(name, imgData?.data?.url);
              setErrorMessage("");
              navigate("/");
              // navigate("/login");
              // signOutUser();
              toast.success("Account has been created successfully!", {duration: 2000});
            })
            .catch((err) => {
              console.error(err);
              setErrorMessage(err.message);
              setIsLoading(false);
            });
        }
      });
  };

  // update user info
  const updateUserInfo = (name, imageURL) => {
    updateUser(name, imageURL)
      .then(() => {
        console.log("name and photo are added");
        setErrorMessage("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  };

  // google user
  const handleGoogleUser = () => {
    googleUser()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setErrorMessage("");
        navigate("/");
        toast.success("Account has been created successfully through Google!", {duration: 2000});
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
        navigate("/");
        toast.success("Account has been created successfully through Facebook!", {duration: 2000});
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      });
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-3 bg-gray-200 dark:bg-gray-800 text-indigo-900 dark:text-indigo-500">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <div>
          {errorMessage && (
            <p className="text-sm font-medium text-red-500 mb-6 text-center">
              {errorMessage}
            </p>
          )}
        </div>
        <form
          onSubmit={handleSignUp}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label
              htmlFor="name"
              className="block text-gray-900 dark:text-indigo-50"
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              required
              className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="photo"
              className="block text-gray-900 dark:text-indigo-50"
            >
              Your Photo <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              required
              className="w-full px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="email"
              className="block text-gray-900 dark:text-indigo-50"
            >
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Valid email"
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
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-0.5 font-medium">
              [Hints: password must have 1 special character, 1 number, 1
              uppercase and 6 letter long]
            </p>
          </div>
          <div className="relative">
            <button className="block w-full p-3 text-center hover:text-gray-900 hover:bg-indigo-300 font-bold tracking-wide transition-all duration-300 text-indigo-50 bg-indigo-500">
              Sign Up
            </button>
            {isLoading && (
              <div className="absolute w-8 h-8 border-2 bottom-2 left-28 border-dashed rounded-full animate-spin border-indigo-50"></div>
            )}
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">
            Quick Sign up with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleUser}
            aria-label="sign up with Google"
            className="p-3 text-xl hover:text-indigo-500"
          >
            <FaGoogle />
          </button>
          <button
            onClick={handleFacebookUser}
            aria-label="sign up with Facebook"
            className="p-3 text-xl hover:text-indigo-500"
          >
            <FaFacebookF />
          </button>
        </div>
        <p className="text-sm text-center sm:px-6 text-gray-500 dark:text-gray-400">
          Already have an account? Please{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
