import React, { useContext, useState } from "react";
import "./AddTask.css";
import { UserContext } from "../../../Context/AuthContext";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const time = new Date();

  const handleAddTask = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
    const image = form.photo.files[0];

    const imageHostKey = process.env.REACT_APP_IMGBB_KEY;
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
    .then(res => res.json())
    .then(imgData => {
      if(imgData?.success){
        const newTask = {
          userName: user?.displayName,
          userEmail: user?.email,
          task,
          taskImage: imgData?.data?.url,
          addingTime: time.getTime()
        };

        fetch(`${process.env.REACT_APP_HOST_LINK}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        })
        .then(res => res.json())
        .then(taskData => {
          if(taskData.acknowledged){
            form.reset();
            toast.success("Task added successfully!", {duration: 2000});
            setIsLoading(false);
            navigate("/my-tasks");
          }
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
      }
    })
    .catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  };

  return (
    <section className="h-[680px] px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="bg-light-addTask dark:bg-dark-addTask py-20 px-16 md:px-32 flex justify-center items-center">
        <div className="w-2/4">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              name="task"
              required
              autoFocus
              placeholder="Add a task..."
              className="block w-52 md:w-full py-2 px-1 bg-transparent border-b-2 border-gray-400 dark:border-gray-700 text-lg font-medium text-center text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-700"
            />

            <input
              type="file"
              name="photo"
              required
              className="mt-6 bg-gray-400 dark:bg-gray-700 w-52 md:w-full text-gray-900 dark:text-gray-100 py-10 px-2 md:px-6 lg:px-28 xl:px-36"
            />

            <div className="w-52 mx-auto relative">
              <input
                type="submit"
                value="Add Task"
                className="bg-indigo-900 dark:bg-indigo-500 text-gray-200 dark:text-gray-900 px-6 py-2 font-bold tracking-wide transition-all duration-300 hover:bg-indigo-800 dark:hover:bg-indigo-400 cursor-pointer mt-10 w-full"
              />
              {
                isLoading && <div className="absolute w-6 h-6 border-2 bottom-2 left-8 border-dashed rounded-full animate-spin border-indigo-50"></div>
              }
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTask;
