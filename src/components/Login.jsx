// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState(""); // Fixed here

//     const handleSubmit = () => {
//         const payload = { email, password };
    
//         axios.post('https://reqres.in/api/login', payload)
//             .then((res) => {
//                 alert("Login Successful");
//                 localStorage.setItem("token", JSON.stringify(res.data.access_token));
//                 // Corrected
//                 console.log("Login Successful", res);
//             })
//             .catch((err) => {
//                 alert("Login Failed");
//                 console.log("Login Failed", err);
//             });
//     };
    

//     return (
//         <div className='bg-sky-200 space-y-4 p-5 rounded-md shadow-md m-10 w-72'>
//             <p className='font-semibold text-lg text-center'>Login Page</p>

//             <div>
//                 <p>Email</p>
//                 <input onChange={(e) => setEmail(e.target.value)} type="email" className='border rounded-md shadow-md' />
//             </div>
//             <div>
//                 <p>Password</p>
//                 <input onChange={(e) => setPassword(e.target.value)} type="password" className='border rounded-md shadow-md' />
//             </div>
//             <button onClick={handleSubmit} className='bg-blue-600 px-4 py-1 rounded-md shadow-md text-white'>Login</button>
//         </div>
//     );
// };

// export default Login;


// // "email": "eve.holt@reqres.in",
// //     "password": "cityslicka"
// // QpwL5tke4Pnpja7X4