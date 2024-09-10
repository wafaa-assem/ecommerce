import { Link, NavLink, useNavigate } from "react-router-dom";
import freshCartLogo from "./../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { authContextObject } from "../../Context/AuthContext";

export default function Navbar() {
  const navigate =useNavigate();
  const {token,setToken } = useContext(authContextObject);

  function handleLogout(){
    localStorage.removeItem("tkn");
    setToken(null);
    navigate('/login');
    
    
  }
  




  return (
    <nav className="bg-slate-100 p-5 text-center">

      <div className="flex flex-col md:flex-row justify-between items-center container mx-auto relative">
      <div className="flex flex-col md:flex-row items-center space-x-5">
        <Link to="">
          <img src={freshCartLogo} width={120} alt="fresh cart" />
        </Link>
        {token ?  <ul className="flex flex-col md:flex-row gap-3 text-gray-500">
     
     <li>
       <NavLink to="/" className="">Products</NavLink>
     </li>
     <li>
       <NavLink to="/categories" className="">Categories</NavLink>
     </li>
     <li>
       <NavLink to="/brands" className="">Brands</NavLink>
     </li>
     <li>
       <NavLink to="/cart" className="">Cart</NavLink>
     </li>
   </ul> : ''}
        
      </div>
      <div className="flex flex-col md:flex-row items-center space-x-5">
        <ul className="flex items-center gap-3">
          <li>
            <i className="fa-brands cursor-pointer fa-instagram"></i>
          </li>
          <li>
            <i className="fa-brands cursor-pointer fa-facebook"></i>
          </li>
          <li>
            <i className="fa-brands cursor-pointer fa-tiktok"></i>
          </li>
          <li>
            <i className="fa-brands cursor-pointer fa-twitter"></i>
          </li>
          <li>
            <i className="fa-brands cursor-pointer fa-linkedin"></i>
          </li>
          <li>
            <i className="fa-brands cursor-pointer fa-youtube"></i>
          </li>
        </ul>

        <ul className="flex flex-col md:flex-row items-center gap-3 text-gray-500">
          {token ?  <li>
            <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
          </li> : <>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
          </>}
          
          
        </ul>
      
      </div>
      </div>
    </nav>
  );
}
