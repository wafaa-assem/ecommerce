import axios from "axios"
import { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function ProductDetails() {
  const {addProductsToCart} = useContext(cartContext);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true

  };

   async function handleAddToCart(id){
    const flag = await addProductsToCart(id);
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

    //hook from react-router-dom to get params that sent in the path => must be not important params to user 
    const {id , category} = useParams();
    
    
    //call api 
    function getSpecificProduct(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    function getAllRelatedCategory(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
  const {data , isLoading} = useQuery({
        queryKey: ['specificProduct',id],
        queryFn: getSpecificProduct ,
    });
  const {data: relatedCategoryData } = useQuery({
        queryKey: 'relatedCategory',
        queryFn: getAllRelatedCategory ,
    });
    
    
    let relatedData = relatedCategoryData?.data.data;
   let result = relatedData?.filter((product)=> product.category.name == category)
  //  console.log(result);
   
    
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


  return <>
  <div className="container mx-auto flex justify-center items-center p-8">
    <div className="w-[25%] px-5">
    {data.data.data.images.length > 1 ? <Slider {...settings}>
     {data.data.data.images.map((image)=> <img key={data.data.data._id} src={image} className="w-full" alt={data.data.data.title} />)}
    </Slider> : <img src={data.data.data.imageCover} className="w-full" alt={data.data.data.title} />}
    </div>
    <div className="w-[70%] ms-4 px-5">
        <h1 className="font-semibold">{data.data.data.title}</h1>
        <p className="text-gray-400 p-2">{data.data.data.description}</p>
        <h4 className="text-green-600">{data.data.data.category.name}</h4>
        <div className="flex justify-between items-center">
            <h4>{data.data.data.price} EGP</h4>
            <h4>
              <i className="fa-solid fa-star text-yellow-400"></i> {data.data.data.ratingsAverage}
            </h4>
        </div>
        <button onClick={()=>{handleAddToCart(id)}} className="w-full p-1 mt-3 rounded-xl bg-green-600 text-white">+ add to cart</button>
    </div>
  </div>
  <div className="container mx-auto p-8">
  <div className="grid md:grid-cols-3 lg:grid-cols-6">
          {result?.map((product) => (
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
  </div>
  </>
}
