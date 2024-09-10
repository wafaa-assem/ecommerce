import axios from "axios"
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";


export default function Brands() {
  function getAllBrands(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const {data , isLoading } = useQuery({
    queryKey: 'allBrands',
    queryFn: getAllBrands,
  });
  if(isLoading){
    return  <div className="h-screen bg-green-500 flex justify-center items-center">
    <FallingLines
      color="#FFFF"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  </div>
  }
  
  return<>
  <div className="container mx-auto p-5">
    <div className="grid md:grid-cols-3 gap-5">
     {data.data.data.map(brand =>  <div key={brand._id} className="brand bg-slate-200 p-2 rounded-xl">
        <img src={brand.image} className="w-full" alt={brand.name} />
        <h2 className="font-semibold text-2xl">{brand.name}</h2>
      </div>)}
    </div>
  </div>
  </>
}
