import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AddTask from "../Pages/MainPages/AddTask/AddTask";
import CompletedTasks from "../Pages/MainPages/CompletedTasks/CompletedTasks";
import Home from "../Pages/MainPages/Home/Home";
import MyTasks from "../Pages/MainPages/MyTasks/MyTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/add-task',
        element: <AddTask/>
      },
      {
        path: '/my-tasks',
        element: <MyTasks/>
      },
      {
        path: '/completed-tasks',
        element: <CompletedTasks/>
      },
    ]
  }
])


export default router;