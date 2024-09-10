import { useFormik } from "formik"
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Payment() {
   const {cartID ,updateUi,clearCart } = useContext(cartContext);
   const [isClicked, setisClicked] = useState(false)
//    console.log(cartID);
function detectSubmitState(values){
    if(isClicked){
        paymentOnlineSubmit(values);  
    }else{
        paymentSubmit(values);
    }
}
    function paymentSubmit(values){
        
     const shippingAddress =   {
            shippingAddress:values,
        }
        // console.log(shippingAddress);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,shippingAddress,{
            headers:{
                token:localStorage.getItem('tkn')
            }
        }).then(({data})=>{
            console.log('ok',data);
            toast.success(data.status); 
            updateUi();
        })
        .catch((error)=>{
            console.log('error',error);
            

        })
    }
    function paymentOnlineSubmit(values){
        
     const shippingAddress =   {
            shippingAddress:values,
        }
        // console.log(shippingAddress);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,shippingAddress,{
            headers:{
                token:localStorage.getItem('tkn')
            },
            params:{
                url: 'http://localhost:3000'
            }
        }).then(({data})=>{
            console.log('online ok',data);
            toast.success(data.status); 
            window.open(data.session.url,'_self');
            clearCart(); //to handle this cuz api msh mhndle eno yms7 el cart mn 3ndo fel db laken da msh sa7 
        })
        .catch((error)=>{
            console.log('error',error);
        })
    }

   const paymentFormik = useFormik({
        initialValues : {
            details: '',
            phone:'',
            city:''
        },
        onSubmit: detectSubmitState ,
    });

  return <>
  <div className="md:w-[60%] mx-auto p-5 md:p-10">
  <form onSubmit={paymentFormik.handleSubmit} >
         
         {/* details */}
         <div className="relative z-0 w-full mb-5 group">
           <input
             value={paymentFormik.values.details}
             onChange={paymentFormik.handleChange}
             onBlur={paymentFormik.handleBlur}
             type="text"
             name="details"
             id="details"
             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
             placeholder=" "
             required
           />
           <label
             htmlFor="details"
             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
           >
             details 
           </label>
           {paymentFormik.errors.details && paymentFormik.touched.details ? (
             <div
               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
               role="alert"
             >
               {paymentFormik.errors.details}
             </div>
           ) : (
             ""
           )}
         </div>
         {/* phone */}
         <div className="relative z-0 w-full mb-5 group">
           <input
             value={paymentFormik.values.phone}
             onChange={paymentFormik.handleChange}
             onBlur={paymentFormik.handleBlur}
             type="tel"
             name="phone"
             id="phone"
             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
             placeholder=" "
             required
           />
           <label
             htmlFor="phone"
             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
           >
             phone
           </label>
           {paymentFormik.errors.phone &&
           paymentFormik.touched.phone ? (
             <div
               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
               role="alert"
             >
               {paymentFormik.errors.phone}
             </div>
           ) : (
             ""
           )}
         </div>
         {/* city */}
         <div className="relative z-0 w-full mb-5 group">
           <input
             value={paymentFormik.values.city}
             onChange={paymentFormik.handleChange}
             onBlur={paymentFormik.handleBlur}
             type="text"
             name="city"
             id="city"
             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
             placeholder=" "
             required
           />
           <label
             htmlFor="city"
             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
           >
             city
           </label>
           {paymentFormik.errors.city &&
           paymentFormik.touched.city ? (
             <div
               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
               role="alert"
             >
               {paymentFormik.errors.city}
             </div>
           ) : (
             ""
           )}
         </div>
         <button
         onClick={()=>setisClicked(false)}
           type="submit"
           className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
         >
           Cash Order 
         </button>
         <button
          onClick={()=>setisClicked(true)}
           type="submit"
           className="text-white mx-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
         >
           Online Order 
         </button>
       </form>
  </div>
  
  
  </>
}
