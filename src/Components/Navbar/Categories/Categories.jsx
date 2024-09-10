import axios from "axios"
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import useCategory from "../../../CustomHooks/useCategory";

export default function Categories() {
//   function getAllCategories(){
//     return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
//   }

//  const {data , isLoading} = useQuery({
//     queryKey: 'allCategories',
//     queryFn: getAllCategories,
//   });
const {data , isLoading} = useCategory();

  if(isLoading){
    return <>
     <div className="h-screen bg-green-500 flex justify-center items-center">
    <FallingLines
      color="#FFFF"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  </div>
  </>
  }

  return <>
   <div className="container mx-auto p-5">
    <div className="grid md:grid-cols-3 gap-5">
     {data.data.data.map(category =>  <div key={category._id} className="category bg-slate-200 p-2 rounded-xl">
        <img src={category.image} className="w-full" alt={category.name} />
        <h2 className="font-semibold text-2xl">{category.name}</h2>
      </div>)}
    </div>
  </div>
  </>
}
