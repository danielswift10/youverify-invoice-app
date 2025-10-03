import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "./pages/auth";
import { routesData } from "./utils/data";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./pages/dashboard/components/DashboardLayout";

export default function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path="sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />

      {/* Dashboard Routes */}
      {routesData.map((route, index) => {
        const Component = route.element;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Component />
                </DashboardLayout>
              </ProtectedRoute>
            }
          >
            {route.children?.map((child, childIndex) => {
              const ChildComponent = child.element;
              return (
                <Route
                  key={`${index}-${childIndex}`}
                  path={child.path}
                  element={<ChildComponent />}
                />
              );
            })}
          </Route>
        );
      })}
    </Routes>
  );
}
