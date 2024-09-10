import { useContext, useEffect } from "react";
import { cartContext } from "../../Context/CartContext";
// import Products from './../Products/Products';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';

export default function Cart() { 
 const { getProductsFromCart, products , totalCartPrice , numOfCartItems , updateQuantity ,deleteProduct , clearCart} = useContext(cartContext);
//  console.log(products.length);
 
 function handleDelete(id){
  const flag = deleteProduct(id);
  if(flag){
    toast.success('Product successfully deleted');
  }else{
    toast.error('Error deleting product');
  }

 }

 
 useEffect(() => {
    getProductsFromCart();
  },[]);

  return (
    <>
      <div className="container mx-auto p-8 relative ">
        {/* <h2 className="text-center font-semibold">Total Price is <span className="text-green-600">{totalCartPrice} LE</span></h2> */}
        <h2 className="text-center mb-3 text-gray-500 ">Your cart includes <span className="text-green-600">{numOfCartItems} different items</span></h2>
         <button onClick={clearCart} className="bg-green-600 text-white py-1 px-3 rounded-lg absolute top-6 end-10 ">Clear</button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                    disabled={product.count === 1 }
                    onClick={()=>{updateQuantity(product.product._id , product.count -1)}}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        // type="number"
                        id="first_product"
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={product.count}
                        required
                        
                      />
                    </div>
                    <button
                    onClick={()=>{updateQuantity(product.product._id , product.count +1)}}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <a
                  onClick={()=>handleDelete(product.product._id)}
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-center py-5 text-2xl text-gray-500">Total Price  <span className="text-green-600">{totalCartPrice} LE</span></h3>
        {/* <Link to='/payment'><button  className="bg-green-600 text-white py-1 px-3 rounded-lg">CHECK OUT</button></Link> */}
      {products.length != 0 ? <Link to='/payment'><button  className="bg-green-600 text-white py-1 px-3 rounded-lg">CHECK OUT</button></Link> : ''}
      </div>
      
      </div>
    </>
  );
}
