import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Header from "./components/title-page/TitlePage";
import Product from "./components/products/Product";
import AddProduct from "./components/products/AddProduct";
import UpdateProduct from "./components/products/UpdateProduct";
import ViewCart from "./components/ecommerce/products-cart/ProductCart";
import Cards from "./components/ecommerce/card/Cards";

interface IRoute {
  path: string;
  element: React.ReactNode;
  index?: boolean;
  children?: IRoute[];
}

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Header title={"Main Dashboard"} />,
      },
      {
        path: "/product",
        element: <Product />,
        children: [],
      },
      {
        path: "/product/add",
        element: <AddProduct />,
      },
      {
        path: "product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/e-commerce",
        element: <Cards />,
      },
      {
        path: "/view-cart",
        element: <ViewCart />,
      },
    ],
  },
];

function renderRoute(route: IRoute) {
  return (
    <Route path={route.path} element={route.element} key={route.path}>
      {route.children && route.children.map(renderRoute)}
    </Route>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>{routes.map(renderRoute)}</Routes>
    </BrowserRouter>
  );
}

export default App;
