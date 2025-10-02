import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "./(auth)";
import { routesData } from "./utils/data";
import DashboardLayout from "./(dashboard)/layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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
