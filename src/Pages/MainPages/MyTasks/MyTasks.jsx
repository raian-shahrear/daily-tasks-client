import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext } from "react";
import { UserContext } from "../../../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyTasks = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_HOST_LINK}/tasks?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // update task to complete
  const handleCompleteTask = (completeTask) => {
    const agree = window.confirm(
      `Do you want to complete the task name "${completeTask?.task}"?`
    );
    if (agree) {
      const updateTask = { isCompleted: true };
      fetch(`${process.env.REACT_APP_HOST_LINK}/tasks/${completeTask?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTask),
      })
        .then((res) => res.json())
        .then((updateData) => {
          if (updateData.acknowledged) {
            toast.success("Task has been Updated!", { duration: 2000 });
            refetch();
            navigate("/completed-tasks");
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
        tasks?.length > 8 ? "h-full" : "h-[680px]"
      } px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8`}
    >
      <h1 className="mb-12 w-40 mx-auto text-2xl font-bold border-b border-gray-200 dark:border-indigo-800 pb-2 text-center text-indigo-900 dark:text-indigo-400">
        My Task
      </h1>
      {tasks?.length === 0 ? (
        <p className="mt-48 text-center text-4xl font-semibold text-gray-300 dark:text-gray-700">Task Is Not Added Yet</p>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-accent uppercase bg-gray-200 dark:text-gray-200 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3 px-2 w-10"></th>
                <th scope="col" className="py-3 px-2 w-50">
                  Task Name
                </th>
                <th scope="col" className="py-3 px-2 w-36 hidden lg:block">
                  Date & Time
                </th>
                <th scope="col" className="py-3 px-2 w-50">
                  Your Name
                </th>
                <th scope="col" className="py-3 px-2 w-60">
                  Your Email
                </th>
                <th scope="col" className="py-3 px-2 text-center w-1/4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <tr
                  key={task?._id}
                  className="bg-white text-indigo-900 dark:bg-gray-600 dark:text-indigo-100 border-b"
                >
                  <th
                    scope="row"
                    className="py-2 px-3 font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
                  >
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={task?.taskImage} alt="task" />
                      </div>
                    </div>
                  </th>
                  <td className="p-2">{task?.task}</td>
                  <td className="p-2 hidden lg:block">
                    {format(new Date(task?.addingTime), "PPpp")}
                  </td>
                  <td className="p-2">{task?.userName}</td>
                  <td className="p-2">{task?.userEmail}</td>
                  <td className="p-2 mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                    {task?.isCompleted ? (
                      <p className="text-green-600 dark:text-green-300 font-medium text-center">
                        Completed
                      </p>
                    ) : (
                      <button
                        onClick={() => handleCompleteTask(task)}
                        className="bg-indigo-900 dark:bg-indigo-500 text-gray-200 dark:text-gray-900 px-1 py-1 font-medium tracking-wide transition-all duration-300 hover:bg-indigo-700 dark:hover:bg-indigo-300"
                      >
                        Complete Task
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteTask(task)}
                      className="bg-red-900 dark:bg-red-500 text-gray-200 dark:text-gray-900 px-1 py-1 font-medium tracking-wide transition-all duration-300 hover:bg-red-700 dark:hover:bg-red-300"
                    >
                      Delete Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyTasks;
