"use client";
// import { useEffect } from "react";
// import { useSession, signIn } from "next-auth/react";
import { CreateTaskForm } from "./create-task-form";
import "./create-task.module.css";
// import "./global.css";


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
    // useEffect(() => {
    // //     // console.log("CreateTaskPage mounted");
    // }, []);
    // const { data: session } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         signIn("auth-provider", { callbackUrl: "/admin" });
    //     },
    // });
    // if (!session) {
    //     return <h1 className="text-5xl">Access Denied</h1>;
    // }
    return (
        <div className=" mx-auto flex flex-col gap-8 pt-12 pb-24 ">
            <h1 className="text-4xl font-bold">Create Task</h1>
            <CreateTaskForm />
        </div>
    );
}
