import { Card, CardHeader, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import Authdata from "../services/authservice";
import { Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
interface FormInputs {
  email: string;
}
export function LoginPage({ children }: { children?: ReactNode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errror, setErrror] = useState("");

const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async(data) => {
    console.log("Form Data:", data);
      try {
        await Authdata.login(data.email, data.password).then(
          (response: any) => {
            if (response.message) {
              console.log("Response in login is", response);
              setErrror(response.message);
            }
            else if (!response.message) {
              navigate('/')
              window.location.reload();
              console.log(response.accessToken)
            }
            else{
              console.log("WHAT IS THIS")
            }
          },
          (error) => {
            console.log("The error in login",error);
          }
        );
      } catch (error) {
        console.log("The error login", error);
      }
  })
  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute top-4 right-4">
        <a
          href="/createaccount"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Create Account
        </a>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm shadow-md border border-gray-200">
          <CardHeader className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Login to you Account
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter your email below to Login to your account
            </p>
          </CardHeader>
          <div className="p-6">
            <div className="flex justify-center space-x-4 mb-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2 px-4 py-2"
              >
                <span>🐙</span>
                <span>GitHub</span>
              </Button>
            </div>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>
            <form className="lgreg" onSubmit={onSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="mt-1 pl-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="m@example.com"
                />
                {errors.email && <p>{errors.email.message as string}</p>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  type="password"
                  id="password"
                  className="mt-1 pl-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
              </div>
              <Button type="submit" className="w-full bg-black text-white py-2">
                Log In
              </Button>
              <p style={{ color: "red" }}>{errror}</p>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
