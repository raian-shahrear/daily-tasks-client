import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../Context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TaskDescriptions from "./TaskDescriptions";

const CompletedTasks = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allDescriptions, setAllDescription] = useState([]);
  const time = new Date();

  // get tasks by email
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task-completed", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_HOST_LINK}/task-completed?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // update task to incomplete
  const handleIncompleteTask = (incompleteTask) => {
    const agree = window.confirm(
      `Do you want to make the task "${incompleteTask?.task}" to incomplete?`
    );
    if (agree) {
      const updateTask = { isCompleted: false };
      fetch(`${process.env.REACT_APP_HOST_LINK}/tasks/${incompleteTask?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTask),
      })
        .then((res) => res.json())
        .then((updateData) => {
          if (updateData.acknowledged) {
            toast.success("Task has been Updated to incomplete!", {
              duration: 2000,
            });
            refetch();
            navigate("/my-tasks");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // delete task
  const handleDeleteTask = (deleteTask) => {
    const agree = window.confirm(
      `Do you want to delete the task name "${deleteTask?.task}"?`
    );
    if (agree) {
      fetch(`${process.env.REACT_APP_HOST_LINK}/tasks/${deleteTask?._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((deleteData) => {
          if (deleteData.acknowledged) {
            toast.success("Task has been Deleted!", { duration: 2000 });
            refetch();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  //----------------------------------------------
  // post/create description
  const handleDescription = (event, myTask) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const description = form.description.value;

    const newDescription = {
      userName: user?.displayName,
      userEmail: user?.email,
      taskName: myTask?.task,
      taskId: myTask?._id,
      description,
      postingTime: time.getTime(),
    };
    fetch(`${process.env.REACT_APP_HOST_LINK}/descriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDescription),
    })
      .then((res) => res.json())
      .then((descriptionData) => {
        if (descriptionData.acknowledged) {
          form.reset();
          toast.success("Description added successfully!", { duration: 2000 });
          setLoading(false);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="h-[700px] px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      </div>
    );
  }

  return (
    <section
      className={`${
        tasks?.length > 1 || allDescriptions?.length > 1 ? "h-full" : "h-[680px]"
      } px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8`}
    >
      <h1 className="mb-12 w-52 mx-auto text-2xl font-bold border-b border-gray-200 dark:border-indigo-800 pb-2 text-center text-indigo-900 dark:text-indigo-400">
        Completed Tasks
      </h1>
      {tasks?.length === 0 ? (
        <p className="mt-48 text-center text-4xl font-semibold text-gray-300 dark:text-gray-700">
          Task Has Not Been Completed Yet
        </p>
      ) : (
        tasks?.map((task) => (
          <div
            key={task?._id}
            className="mb-6 p-6 sm:p-12 bg-gray-200 dark:bg-gray-800 text-indigo-900 dark:text-indigo-100"
          >
            <div className="flex flex-col items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6 lg:flex-row">
              <img
                src={task?.taskImage}
                alt=""
                className="flex-shrink-0 w-24 h-24 rounded justify-self-center lg:justify-self-start bg-gray-400 dark:bg-gray-500"
              />
              <div className="flex flex-col w-full">
                <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-10">
                  <h4 className="text-lg font-bold lg:text-left flex justify-center lg:justify-start items-center gap-2">
                    <span
                      title="Completed"
                      className="text-sm font-normal text-green-600 dark:text-green-300"
                    >
                      <FaCheckCircle />
                    </span>
                    <span>{task?.task}</span>
                  </h4>
                  <div>
                    <button
                      onClick={() => handleIncompleteTask(task)}
                      className="bg-indigo-900 dark:bg-indigo-500 text-gray-200 dark:text-gray-900 px-1 py-1 mr-4 text-xs font-bold tracking-wide transition-all duration-300 hover:bg-indigo-700 dark:hover:bg-indigo-300"
                    >
                      Not Completed
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task)}
                      className="bg-red-900 dark:bg-red-500 text-gray-200 dark:text-gray-900 px-1 py-1 text-xs font-bold tracking-wide transition-all duration-300 hover:bg-red-700 dark:hover:bg-red-300"
                    >
                      Delete Task
                    </button>
                  </div>
                </div>
                <article className="text-gray-900 dark:text-gray-200">
                  <p className="font-medium mt-5 mb-2 lg:mt-3">
                    Task Description:
                  </p>
                  <TaskDescriptions task={task} refetch={refetch} setAllDescription={setAllDescription} />
                </article>
                <form onSubmit={(event) => handleDescription(event, task)} >
                  <textarea
                    name="description"
                    placeholder="say something..."
                    required
                    className="w-full mt-6 px-4 py-3 border border-transparent bg-indigo-50 text-gray-800 focus:border-transparent dark:bg-gray-900 dark:text-gray-100"
                  />
                  <div className="w-52 mx-auto relative">
                    <input
                      type="submit"
                      value={!loading ? "Add Description" : ""}
                      className="bg-indigo-900 dark:bg-indigo-500 text-gray-200 dark:text-gray-900 px-6 py-2 font-bold tracking-wide transition-all duration-300 hover:bg-indigo-800 dark:hover:bg-indigo-400 cursor-pointer mt-4 w-full"
                    />
                    {loading && (
                      <div className="absolute w-6 h-6 border-2 bottom-3.5 left-24 border-dashed rounded-full animate-spin border-indigo-50"></div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default CompletedTasks;
