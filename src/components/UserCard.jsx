// import React, { useEffect, useState } from 'react'

// const UserCard = () => {
// const [users, setUsers] = useState([]);
// const f = async () => {
//     const res = await fetch("https://reqres.in/api/users/");
//     const json = await res.json();
//     setUsers(json.data);
//   };
 
//   React.useEffect(() => {
//     f();
// }, []);
//   return (
//     <>
//      <div className="flex">
//     {users.length &&
//           users.map((user) => {
//             return (
//               <div key={user.id}>
//                 <p>
//                   <strong>{user.first_name}</strong>
//                 </p>
//                 <p>{user.email}</p>
//                 <img key={user.avatar} src={user.avatar} />
//               </div>
//             );
//           })}
//           </div>
//     </>
//   )
// }

// export default UserCard