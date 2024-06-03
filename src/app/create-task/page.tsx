// /src/app/create-task/page.tsx
"use client";
import { useEffect } from "react";
import { CreateTaskForm } from "./create-task-form";
// import styles from "./create-task.module.css";
// import "./create-task.module.css";
import "./global.css";
// 
// import { Header } from "../header";
// import "./create-task.module.css";

// export default function CreateTaskPage() {
//   useEffect(() => {
//     // console.log("CreateTaskPage mounted");
//   }, []);
//     return (
//       <div className='page-container'>
//       {/* <div style={{ flex: '0 0 50%' }}> */}
//         <h1 className="page-heading">Create Task</h1>
//       <CreateTaskForm /> 
//     </div>
//     // </div>
//   );
// }

export default function CreateTaskPage() {
    useEffect(() => {
        // console.log("CreateTaskPage mounted");
    }, []);
    return (
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24 ">
            <h1 className="text-4xl font-bold">Create Task</h1>

            <CreateTaskForm />
        </div>
    );
}
