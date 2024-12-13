import { Card, CardHeader, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authdata from "../services/authservice";
import { useForm } from "react-hook-form";

export function LogonPage({ children }: { children?: ReactNode }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errror, setErrror] = useState("");

const navigate=useNavigate();
  const handleregister = async (e: any) => {
    e.preventDefault();

    try {
      await Authdata.register(name, email, password, cpassword).then(
        (response: any) => {
            console.log("this is response",response);
          if (response.message) {
            setErrror(response.message);
          }
          if (!response.message) {
            console.log(response.accessToken)
            navigate("/");
            window.location.reload();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async(data) => {
    console.log("Form Data:", data);
    try {
      await Authdata.register(data.name, data.email, data.password, data.cpassword).then(
        (response: any) => {
            console.log("this is response",response);
          if (response.message) {
            setErrror(response.message);
          }
          if (!response.message) {
            console.log(response.accessToken)
            window.location.reload();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  })
  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="absolute top-4 right-4">
        <a
          href="/login"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Login
        </a>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm shadow-md border border-gray-200">
          <CardHeader className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Create an account
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter your email below to create your account
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
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name
                </label>
                <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="John Doe"
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message as string}</p>}
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                    className="mt-1 pl-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="m@example.com"
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message as string}</p>}
            </div>
            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                    })}
                    className="mt-1 pl-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="••••••••"
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message as string}</p>}
            </div>
            <div className="mb-6">
                <label
                    htmlFor="ConfirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    
                    {...register("cpassword", {
                        required: "Please confirm your password",
                        minLength: {
                          value: 8,
                          message: "Confirm Password must be at least 8 characters long",
                          
                      }
                    })}
                    className="mt-1 pl-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="••••••••"
                />
                {errors.cpassword && <p style={{ color: 'red' }}>{errors.cpassword.message as string}</p>}
            </div>
            <Button type="submit" className="w-full bg-black text-white py-2">
                Create account
            </Button>
        </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
