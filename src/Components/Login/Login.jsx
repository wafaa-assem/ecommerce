
import  axios  from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { authContextObject } from '../../Context/AuthContext';
import { cartContext } from '../../Context/CartContext';


export default function Login() {
  // hook ? on top level of components
 const {setToken} = useContext(authContextObject);
 const {getProductsFromCart} = useContext(cartContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [icClicked, setIcClicked] = useState(false);

  let user = {
    email: "",
    password: "",
  };

  function registerUser(values) {
  
    setIcClicked(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function ({ data }) {
        // console.log("saaaaaaaa7", data.token); // toke byege hena => need it at all app => context ? share 
       setToken(data.token);
       localStorage.setItem("tkn" ,data.token );
       getProductsFromCart();

        setIsSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setIcClicked(false);
      })
      .catch(function ({ response }) {
        // console.log("ghalaaaaaaaaat", response.data.message);
        setErrorMsg(response.data.message);
        setTimeout(() => {
          setErrorMsg(null);
        }, 2000);
        setIcClicked(false);
      });
  }
  
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required").email("Invalid Email"),
      password: Yup.string()
        .required("Required")
        .min(6, "min 6 chars")
        .max(12, "max 12 chars"),
    }),
  });

  return (
    <div className="py-5">
      {errorMsg == null ? (
        ""
      ) : (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMsg}
        </div>
      )}
      {isSuccess == false ? (
        ""
      ) : (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
         Welcome Back
        </div>
      )}

      <h2 className="text-center my-8 font-semibold text-green-600 text-4xl">
        Login Form
      </h2>
      <div className="md:w-[60%] mx-auto p-5 md:p-0">
        <form onSubmit={registerFormik.handleSubmit}>
         
          {/* email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.email}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {registerFormik.errors.email && registerFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {registerFormik.errors.password &&
            registerFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {icClicked ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#FFFF", "#FFFF", "#FFFF", "#FFFF", "#FFFF"]}
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
