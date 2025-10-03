import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import type { ISignUp } from "../../types";
import { useSignUp } from "../../../hooks/useSignUp";
import SpinnerIcon from "../../../assets/icons/SpinnerIcon";

export default function SignUpForm() {
  const { loading: registeringUser, registerUser } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<ISignUp>();

  const onSubmit = async (data: ISignUp) => {
    try {
      await registerUser(data);
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-[3rem] w-[44rem]">
      <hgroup>
        <h1 className="text-[3rem] font-semibold">Sign Up</h1>
        <p>Please enter your details.</p>
      </hgroup>
      <form
        className="grid grid-cols-2 gap-[2rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1">
          <Input
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            properties={{
              ...register("firstName", {
                required: "First name is required",
              }),
            }}
            disabled={registeringUser}
            errors={errors?.firstName}
          />
        </div>
        <div className="col-span-1">
          <Input
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            properties={{
              ...register("lastName", {
                required: "Last name is required",
              }),
            }}
            disabled={registeringUser}
            errors={errors?.lastName}
          />
        </div>
        <div className="col-span-2">
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
            disabled={registeringUser}
            errors={errors?.email}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            properties={{
              ...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }),
            }}
            disabled={registeringUser}
            errors={errors?.password}
          />
        </div>
        <div className="col-span-2 space-y-5">
          <Button
            type="submit"
            className="py-[1.6rem]"
            disabled={registeringUser || !isDirty || !isValid}
          >
            {registeringUser ? <SpinnerIcon /> : "Sign Up"}
          </Button>
          <p className="flex items-center font-medium text-grey-600 text-[1.4rem] leading-3 text-center justify-center">
            Already have an account?
            <Button
              href="/sign-in"
              variation="linkGrey"
              size="small"
              className="w-max items-start pl-1"
            >
              Sign In
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
}
