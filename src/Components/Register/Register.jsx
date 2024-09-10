import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [icClicked, setIcClicked] = useState(false);

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  function registerUser(values) {
    // console.log("hello from formik", values);
    // deal with api => request and response
    //   try{
    //     const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values); // error hena gay mnl formik
    //     console.log(data.message);

    //   }catch({response}){      // lw 7asal error => warnining => catch lya el warninng ==> always object gay mnl register dlw2ty
    //     console.log(response.data.message);

    //   }
    setIcClicked(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(function ({ data }) {
        // console.log("saaaaaaaa7", data.message);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
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
  // formik => hook => function => start with use
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Required")
        .min(3, "minmum 3 chars")
        .max(12, "maxmum 12 chars"),
      email: Yup.string().required("Required").email("Invalid Email"),
      phone: Yup.string()
        .required("Required")
        .matches(/^01[0125][0-9]{8}$/, "Invalid Number"),
      password: Yup.string()
        .required("Required")
        .min(6, "min 6 chars")
        .max(12, "max 12 chars"),
      rePassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Re password doesn't match"),
    }),

    // validate: function (values) {
    //   const errors = {};
    //   const nameRegex = /^[A-Z][a-z]{3,8}$/;
    //   const phoneRegex = /^01[0125][0-9]{8}$/;
    //   if (!nameRegex.test(values.name)) {
    //     errors.name =
    //       "Must start with capital letter and at least 3 characters";
    //   }
    //   if (!values.email.includes("@") || !values.email.includes(".")) {
    //     errors.email = "Invalid Email";
    //   }
    //   if (values.password.length < 6 || values.password.length > 12) {
    //     errors.password = "Password must be from 6 to 12 characters";
    //   }
    //   if (values.rePassword !== values.password) {
    //     errors.rePassword = "Password and rePassword doesn't match";
    //   }
    //   if (!phoneRegex.test(values.phone)) {
    //     errors.phone = "Phone must be egyptian number";
    //   }

    //   console.log(errors);

    //   return errors;
    // },
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
          Congratulations !
        </div>
      )}

      <h2 className="text-center my-8 font-semibold text-green-600 text-4xl">
        Registration Form
      </h2>
      <div className="md:w-[60%] mx-auto p-5 md:p-0">
        <form onSubmit={registerFormik.handleSubmit}>
          {/* name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.name}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
            {registerFormik.errors.name && registerFormik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
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
          {/* repassrord */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.rePassword}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
            {registerFormik.errors.rePassword &&
            registerFormik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* phone */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.phone}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
            {registerFormik.errors.phone && registerFormik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {registerFormik.errors.phone}
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
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
