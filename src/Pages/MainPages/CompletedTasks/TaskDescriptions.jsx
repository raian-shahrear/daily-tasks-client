import React, { useContext, useState } from "react";
import { UserContext } from "../../../Context/AuthContext";
import { FaRegClock, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TaskDescriptions = ({ task, setAllDescription }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { _id } = task;
  const time = new Date();

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
          refetch();
          // window.location.reload()
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // get descriptions
  const { data: taskDescriptions, refetch } = useQuery({
    queryKey: ["descriptions", user?.email, _id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_HOST_LINK}/descriptions?email=${user?.email}&id=${_id}`
      );
      const data = await res.json();
      setAllDescription(data);
      return data;
    },
  });

  // delete task
  const handleDeleteDescription = (descriptionId) => {
    const agree = window.confirm(`Do you want to delete the Description?`);
    if (agree) {
      fetch(
        `${process.env.REACT_APP_HOST_LINK}/descriptions/${descriptionId}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((deleteData) => {
          if (deleteData.acknowledged) {
            toast.success("Description has been Deleted!", { duration: 2000 });
            refetch();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <article className="text-gray-900 dark:text-gray-200">
        <p className="font-medium mt-5 mb-2 lg:mt-3">Task Description:</p>
        {taskDescriptions?.map((description) => (
          <div
            key={description?._id}
            className="text-sm gap-3 mb-4 grid grid-cols-4 lg:grid-cols-12"
          >
            <p className="col-span-1 lg:w-auto mt-[5px] grid grid-cols-1 lg:grid-cols-2 items-start justify-items-center gap-2 lg:gap-0">
              <span className="flex flex-col items-center">
                <FaRegClock className="text-indigo-500" />
                <small className="text-center font-medium text-gray-500 dark:text-gray-400">
                  {
                    (time - new Date(description?.postingTime))/1000/60/60 >= 24 
                    ? Math.floor((time - new Date(description?.postingTime))/1000/60/60/24) + " d" 
                    : (time - new Date(description?.postingTime))/1000/60 >= 60 
                    ? Math.floor((time - new Date(description?.postingTime))/1000/60/60) + " h"
                    : Math.floor((time - new Date(description?.postingTime))/1000/60) + " min"
                  }
                </small>
              </span>
              <span onClick={() => handleDeleteDescription(description?._id)}>
                <FaTrashAlt
                  title="Delete Comment"
                  className="text-red-600 cursor-pointer hover:text-red-400"
                />
              </span>
            </p>
            <span className="col-span-3 lg:col-span-11 lg:w-auto">
              {description?.description}
            </span>
          </div>
        ))}
      </article>
      <form onSubmit={(event) => handleDescription(event, task)}>
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
    </>
  );
};

export default TaskDescriptions;
