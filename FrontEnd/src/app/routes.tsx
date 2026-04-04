import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import ErrorPage from "./pages/Error";
import AccountPage from "./pages/AccountPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute  from "./ProtectedRoute"; // Đảm bảo file này đã đổi tên thành AdminRoute.tsx

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
  {
    path: "/create-article",
    element: <CreateArticle />,
  },
  {
    path: "/account/:id",
    element: <AccountPage />,
  },
{
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);