import React, { useContext } from "react";
import { UserContext } from "../../../Context/AuthContext";
import { FaRegClock, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { format } from "date-fns";

const TaskDescriptions = ({ task, setAllDescription }) => {
  const { _id } = task;
  const { user } = useContext(UserContext);

  const {
    data: taskDescriptions,
    isLoading,
    refetch,
  } = useQuery({
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
      {taskDescriptions?.map((description) => (
        <div
          key={description?._id}
          className="text-sm gap-3 mb-4 grid grid-cols-4 lg:grid-cols-5"
        >
          <p className="col-span-1 lg:w-auto mt-[5px] flex flex-col-reverse lg:flex-row-reverse items-center lg:items-start justify-end gap-2 lg:gap-2">
            <span onClick={() => handleDeleteDescription(description?._id)}>
              <FaTrashAlt
                title="Delete Comment"
                className="text-red-600 cursor-pointer hover:text-red-400"
              />
            </span>
            <span className="flex flex-col items-center">
              <FaRegClock className="text-indigo-500" />
              <small className="text-center font-medium text-gray-500 dark:text-gray-400">
              {format(new Date(description?.postingTime), "PPpp")}
              </small>
            </span>
          </p>
          <span className="col-span-3 lg:col-span-4 lg:w-auto">
            {description?.description}
          </span>
        </div>
      ))}
    </>
  );
};

export default TaskDescriptions;
