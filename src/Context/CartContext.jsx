import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();
export default function CartContext({ children }) {
  //states
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [cartID, setCartID] = useState(null);
  function updateUi() {
    setNumOfCartItems(0);
    setTotalCartPrice(0);
    setProducts([]);
    setCartID(null);
  }

  //post data fel api => add product in cart =? send dataaaa of product
  async function addProductsToCart(pdroductID) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: pdroductID,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then(({ data }) => {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setProducts(data.data.products);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  //get products from cart after user add it
  function getProductsFromCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then(({ data }) => {
        // console.log("sa7", data);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setProducts(data.data.products);
        setCartID(data.data._id);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  //update quantity
  function updateQuantity(productID, quantity) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
        {
          count: quantity,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then(({ data }) => {
        // console.log('res' , data);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setProducts(data.data.products);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  //delete from cart
  async function deleteProduct(productID) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then(({ data }) => {
        // console.log('sa7' , data);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setProducts(data.data.products);
        return true;
      })
      .catch((error) => {
        console.log("8lt", error);
        return false;
      });
  }

  //clear cart
  function clearCart() {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then(({ data }) => {
        // console.log('SA7',data);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        toast.success(data.message);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <cartContext.Provider
      value={{
        addProductsToCart,
        numOfCartItems,
        totalCartPrice,
        products,
        getProductsFromCart,
        updateQuantity,
        deleteProduct,
        clearCart,
        cartID,
        updateUi,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
