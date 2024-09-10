import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import HomeSlider from "../HomeSlick/HomeSlick";
import img1 from "./../../assets/images/3d-cartoon-beauty-products.jpg";
import img2 from "./../../assets/images/assortment-citrus-fruits.png";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  const {addProductsToCart} = useContext(cartContext);
  async function handleAddToCart(id){
   const flag = await addProductsToCart(id)
   if(flag){
    toast.success('Product added successfully to your cart' , {
      duration: 3000,
    });
   }else{
    toast.error('Product failed to add to your cart',{
      duration:3000 ,
    });
   }
  }
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, isFetched, isFetching, refetch } = useQuery({
    queryKey: "allProducts",
    queryFn: getAllProducts,
    // refetchOnMount: false,
    // refetchOnWindowFocus:true ,
    // retry:3,
    // retry:0 , in production on server => handle msg when erro from first time + enak lel server
    // retryDelay:5000,yekarar kol 2d eh
    // cacheTime:5000,
    // refetchInterval:1000,
    // enabled: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen bg-green-500 flex justify-center items-center">
        <FallingLines
          color="#FFFF"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  
  return (
    <>
      <div className="container mx-auto py-5">
        <div className="flex justify-center items-center pb-5 px-5">
          <div className="w-[75%]">
            <HomeSlider />
          </div>
          <div className="w-[25%]">
            <div>
              <img src={img1} className="w-full h-[200px] block" alt="" />
            </div>
            <div>
              <img src={img2} className="w-full h-[200px] block" alt="" />
            </div>
          </div>
        </div>
        <CategoriesSlider />



        <div className="grid md:grid-cols-3 lg:grid-cols-6">
          {data?.data.data.map((product) => (
            <div key={product._id} className="products p-2">
              <div className="relative overflow-hidden group">
                <div onClick={()=>handleAddToCart(product._id)} className="bg-green-600 text-white p-3 rounded-2xl cursor-pointer absolute top-2 end-2 translate-x-[150%] group-hover:translate-x-0 transition duration-500">
                  <i className="fa-solid fa-plus"></i>
                </div>
                <Link to={`/productDetails/${product._id}/${product.category.name}`}>
                  <img
                    src={product.imageCover}
                    className="w-full"
                    alt={product.title}
                  />
                  <h5 className="text-green-600">{product.category.name}</h5>
                  <h3 className="font-semibold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p>
                      <span
                        className={
                          product.priceAfterDiscount
                            ? "line-through text-red-600"
                            : ""
                        }
                      >
                        {product.price}
                      </span>
                      <span className="ml-2">
                        {product.priceAfterDiscount} EGP
                      </span>
                    </p>
                    <p>
                      <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                      {product.ratingsAverage}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>



        <button
          className="w-full p-2 rounded-xl bg-slate-300 text-white my-5"
          onClick={refetch}
        >
          Get Products
        </button>
      </div>
    </>
  );
}
