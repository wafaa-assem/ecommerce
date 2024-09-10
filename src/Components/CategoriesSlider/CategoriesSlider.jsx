import axios, { all } from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";
import useCategory from "../../CustomHooks/useCategory";

export default function CategoriesSlider() {
  // const [allCategory, seAllCategory] = useState(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 5,
  };

  // function getCategoriesData() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/categories")
  //     .then(({ data }) => {
  //       // console.log("sa7", data.data);
  //       seAllCategory(data.data);
  //     })
  //     .catch((param) => {
  //       // console.log("ghalat", param);
  //     });
  // }

  // useEffect(() => {
  //   getCategoriesData();
  // }, []);

//   function getAllCategories(){
//     return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
//   }


// const {data , isLoading} = useQuery({
//     queryKey: 'allCategories',
//     queryFn: getAllCategories,
//   });

const {data , isLoading}= useCategory();
// console.log(res);


  if(isLoading){
    return <>
    
    <FallingLines
      color="green"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
    />

  </>
  }
  return  <>
       
    <Slider {...settings} className="px-5 my-5">
      
      {data.data.data.map((category) => {
        return (
          <div key={category._id}>
            <img
              src={category.image}
              className="w-full h-28"
              alt={category.name}
            />
            <h5 className="font-semibold">{category.name}</h5>
          </div>
        );
      })}

    </Slider>
  
</>
 
}
