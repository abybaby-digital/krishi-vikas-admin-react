import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import kvLogo from "../../src/assets/images/kv-logo.png"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../services/api";
import { useForm } from "react-hook-form";
import ButtonLoader from "./ButtonLoader";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setUsers } from "../redux/features/Auth/AuthSlice";

export function LoginForm({
  className,
  ...props
}) {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SECRET_KEY = "login-secret-key"; // Replace with a secure key
  // const navigate = useNavigate();
  const [passwordShown, setPasswordShow] = useState(false);


  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);

  const user = useSelector((state) => state.auth.user);

  console.log(user);



  // Login Api mutation

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      return await adminLogin(data.username, data.password);
    },
    onSuccess: (response) => {
      console.log(response.response.access_token);

      if (response.success === 1) {
        toast.success(response.message);
        dispatch(setUsers(response.response));
        // Encrypt the access token using AES
        const encryptedToken = CryptoJS.AES.encrypt(
          response.response.access_token,
          SECRET_KEY
        ).toString();

        // Store encrypted token and authentication state
        sessionStorage.setItem('token', encryptedToken);
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('user', JSON.stringify(response.response));

        // Dispatch Redux action with user data and token
        dispatch(loginSuccess());

        // Navigate to the dashboard or last visited page
        const lastVisitedPath = sessionStorage.getItem("lastPath") || "/";
        navigate(lastVisitedPath, { replace: true });
      }
      else {
        toast.error(response.message);
      }
    }
  })

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };


  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">
            <img src={kvLogo} alt="this is brand logo" className="w-1/2 mx-auto" />
            <p className="mt-5">Login</p>
          </CardTitle>
          <CardDescription className="text-center">
            Enter  username and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="email">Username</Label>
                  <Input id="email" type="email" placeholder="Username"
                    {...register("username", { required: "Enter username" })}
                  />
                  {
                    errors.username &&
                    <p className="text-red-500 mt-1">{errors.username.message}</p>
                  }
                </div>

              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="password_input relative">

                  <Input ref={ref} id="password" type={!passwordShown ? "password" : "text"} placeholder="Password"
                    {...register("password", { required: "Enter password" })}
                  />
                  <div className="showpassword_btn absolute inline-block right-2 top-[10px] cursor-pointer text-gray-400" onClick={() => {
                    setPasswordShow(!passwordShown);
                  }} >

                    {
                      !passwordShown ? <FaRegEye /> : <FaRegEyeSlash />
                    }
                  </div>
                  {
                    errors.password &&
                    <p className="text-red-500 mt-1">{errors.password.message}</p>
                  }
                </div>

              </div>
              <Button type="submit" className="w-full bg-gradient-green mt-3 rounded-2xl">

                {
                  loginMutation.isPending ? <ButtonLoader /> : "Login"
                }
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
