import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children}) {
//   const navigate =  useNavigate()          navigate ?? normal((js)) function used in any scope 
    if(localStorage.getItem("tkn") == null){
        return   <Navigate to="/login" />              // return jsx code => react router dom help ??? <Navigate to="" /> component 
    }

  return <>
  {children}
  </>
}
