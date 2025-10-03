import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import type { ISignIn } from "../../types";
import { useSignIn } from "../../../hooks/useSignIn";
import SpinnerIcon from "../../../assets/icons/SpinnerIcon";
import GoogleIcon from "../../../assets/icons/GoogleIcon";

export default function SignInForm() {
  const { signInUser, signInWithGoogle, isSigningIn, isSigningInWithGoogle } =
    useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<ISignIn>();

  const onSubmit = async (data: ISignIn) => {
    try {
      await signInUser(data);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
    }
  };

  const isLoading = isSigningIn || isSigningInWithGoogle;

  return (
    <div className="flex flex-col gap-[3rem] w-[44rem]">
      <hgroup>
        <h1 className="text-[3rem] tracking-wide font-semibold">Sign In</h1>
        <p className="tracking-wider">
          Welcome back! Please enter your details.
        </p>
      </hgroup>
      <form className="space-y-[2rem]" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Email"
          placeholder="Enter your email"
          properties={{
            ...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }),
          }}
          disabled={isLoading}
          errors={errors?.email}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          properties={{
            ...register("password", {
              required: "Password is required",
            }),
          }}
          disabled={isLoading}
          errors={errors?.password}
        />
        <Button
          type="submit"
          disabled={!isDirty || !isValid || isSigningIn}
          className="py-[1.6rem]"
        >
          {isSigningIn ? <SpinnerIcon /> : "Sign In"}
        </Button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-grey-200"></div>
          <span className="text-grey-400 text-[1.4rem]">OR</span>
          <div className="flex-1 h-[1px] bg-grey-200"></div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          variation="tertiary"
          className="py-[1.6rem] flex items-center justify-center text-black gap-3"
        >
          {isSigningInWithGoogle ? (
            <SpinnerIcon />
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </Button>

        <p className="flex items-center font-medium text-grey-600 text-[1.4rem] leading-3 text-center justify-center">
          Don&apos;t have an account?
          <Button
            href="/sign-up"
            variation="linkGrey"
            size="small"
            className="w-max items-start pl-1"
          >
            Sign up
          </Button>
        </p>
      </form>
    </div>
  );
}
