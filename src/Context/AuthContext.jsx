import { createContext, useEffect, useState } from "react"

export const authContextObject = createContext();



export default function AuthContextProvidor({children}) {
    const [token, setToken] = useState(null);

    

    useEffect(()=>{
      //did mount ? [] empty dependencies => first render component 
      // console.log("refresh");
      const userToken = localStorage.getItem("tkn");
      if (userToken){
        setToken(userToken);
      }
    }, []);

  return <authContextObject.Provider value={{
    token ,
    setToken,
  
  }}>
  {children}
  </authContextObject.Provider>
}
