import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/Dashboard/Index";
import AuthLayout from "../layouts/auth/index";
// config
import { DEFAULT_PATH } from "../Config";
import LoadingScreen from "../Components/LoadingScreen";
import Dashboard from "../pages/Dashboard/dashboard";
import StackOrdinals from "../pages/Dashboard/StackOrdinals";
import Rewards from "../pages/Dashboard/Rewards";
import History from "../pages/Dashboard/History";
import Settings from "../pages/Dashboard/settings";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

// Pages
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const LoginPage = Loadable(lazy(() => import("../pages/Auth/Login")));
const VerifyPage = Loadable(lazy(() => import("../pages/Auth/Verify")));
const RegisterPage = Loadable(lazy(() => import("../pages/Auth/Register")));
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/Auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/Auth/NewPassword"))
);

export default function Router() {
  return useRoutes([
    // Authentication Routes
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "new-password", element: <NewPasswordPage /> },
        { path: "verify", element: <VerifyPage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "dashboard", element: <Dashboard /> },
        { path: "stakeOrdinals", element: <StackOrdinals /> },
        { path: "rewards", element: <Rewards /> },
        { path: "history", element: <History /> },
        { path: "settings", element: <Settings /> },
      ],
    },
    // Catch-all Route
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
