import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Article from "./pages/Article";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/article/:id",
    Component: Article,
  },
]);
