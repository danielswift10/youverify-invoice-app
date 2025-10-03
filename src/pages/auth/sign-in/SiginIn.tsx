import { Helmet } from "react-helmet-async";
import SignInForm from "./components/SignInForm";
import AuthLayout from "../components/AuthLayout";

export default function SignIn() {
  return (
    <AuthLayout>
      <Helmet>
        <title>Sign In | Youverify</title>
      </Helmet>
        <SignInForm/>

    </AuthLayout>
  );
}
