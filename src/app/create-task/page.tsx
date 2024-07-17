// /src/app/create-task/page.tsx
'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

import { CreateTaskForm } from './create-task-form';

export default function CreateTaskPage() {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') {
			signIn('auth-provider', { callbackUrl: '/' });
		}
	}, [status]);

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!session) {
		return <h1>Access Denied</h1>;
	}

	return (
		<div className="page-container">
			<div className="content-wrapper-left">
				<h1>
					<span className="page-title">
						<span className="boldweight">Create </span>{' '}
					</span>
					a new print file
				</h1>
				<div className="form-container">
					<CreateTaskForm />
				</div>
			</div>
		</div>
	);
}
// export default function CreateTaskPage() {
//   useEffect(() => {
//     // console.log("CreateTaskPage mounted");
//   }, []);
//   const { data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       signIn("auth-provider", { callbackUrl: "/" });
//     },
//   });
//   if (!session) {
//     return <h1>Access Denied</h1>;
//   }
//   return (
//     <div className="page-container">
//       <div className="content-wrapper-left">

//         <h1><span className="page-title"><span className="boldweight">Create </span> </span>a new print file</h1>
//         <div className="form-container">
//           <CreateTaskForm />
//         </div>
//       </div>
//     </div>
//   );
// }
