import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Products from "./Components/Products/Products";
import AuthContextProvidor from "./Context/AuthContext";
import Categories from "./Components/Navbar/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContext from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import { Offline } from "react-detect-offline";
import AllOrders from "./Components/AllOrders/AllOrders";

const queryClientConfig = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      {/* // auth fel awel 34an tabe3e ((el bwaba to proj))=> handle el user authen wala la el awel =>
    // b3den ad5ol gowa ba2a handle el functions wl donia el gowa de ....  */}

      <AuthContextProvidor>
        <QueryClientProvider client={queryClientConfig}>
          <CartContext>
            <RouterProvider router={router} />
          </CartContext>
        </QueryClientProvider>
      </AuthContextProvidor>
      <Toaster />

      <Offline>
        <div className="bg-gray-400 text-white text-xl fixed bottom-5 left-6 p-5">
          You are offline right now. Check your connection.
        </div>
      </Offline>
    </>
  );
}

export default App;
