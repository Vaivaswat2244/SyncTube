import React, { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import Loading from "../assets/Loading";
// import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

function AppContextProvider({ children }) {
   const [loading, setLoading] = useState(false);
   const [users, setUsers] = useState([]);
   const [loggedinUser , setLoggedInUser] = useState([]);

   // const navigate = useNavigate();


   // data filling
   async function fetchuserinfo(type, id) {

      setLoading(true);
      let url = `${baseUrl}`
      if (type && !id) {
         url += `users/details?role=${type}`
      }
      else if (type && id) {
         url += `users/details?role=${type}&user_id=${id}`
      }
      try {
         const result = await fetch(url);
         const data = await result.json();
         console.log(url);
         console.log(data);

         setUsers(data);
      } catch (error) {
         console.log(url)
         setUsers([]);
      }
      setLoading(false);

   }


   const value = {
      //   posts,
      //   setPosts,
      loading,
      setLoading,
      users,
      setUsers,
      fetchuserinfo,
   };


   return (<AppContext.Provider value={value} >
      {children}
   </AppContext.Provider>
   )
}

export default AppContextProvider


