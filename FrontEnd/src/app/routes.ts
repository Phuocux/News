import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import ErrorPage from "./pages/Error";
import AccountPage from "./pages/AccountPage";    

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/article/:id",
    Component: Article,
  },
  {
    path: "/create-article",
    Component: CreateArticle,
  },
  {
    path: "*",
    Component: ErrorPage,
  },
  {
    path: "/account/:id",
    Component: AccountPage,
  }
]);
