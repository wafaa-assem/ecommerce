import axios from "axios";
import { useQuery } from "react-query";

// custom hook is => func 3adeya => share logic ? data ? code js 
export default function useCategory() {
    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      }
    
     const res = useQuery({
        queryKey: 'allCategories',
        queryFn: getAllCategories,
      });
  return res ; 
}
