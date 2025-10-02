import { Route, Routes } from "react-router-dom";
import { Login, SignUp } from "./(auth)";
import { routesData } from "./utils/data";
import DashboardLayout from "./(dashboard)/layout";

export default function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="sign-up" element={<SignUp />} />
      <Route path="login" element={<Login />} />

      {/* Dashboard Routes */}
      {routesData.map((route, index) => {
        const Component = route.element;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <DashboardLayout>
                <Component />
              </DashboardLayout>
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
