import AuthLayout from "../components/AuthLayout";
import { Helmet } from "react-helmet-async";
import SignUpForm from "./components/SignUpForm";

export default function SignUp() {
  return (
    <AuthLayout>
      <Helmet>
        <title>Sign Up | Youverify</title>
      </Helmet>
      <SignUpForm />
    </AuthLayout>
  );
}
