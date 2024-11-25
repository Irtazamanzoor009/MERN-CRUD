import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginStyle.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const [isLoading, setisLoading] = useState(false);
  const [serverError, setserverError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    setisLoading(true);
    try {
      const response = await fetch("https://mern-crud-eight-xi.vercel.app/user/signin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "Application/json" },
      });

      const result = await response.json();
      if (!result.success) {
        setserverError(result.message);
        setTimeout(() => {
          setserverError("");
          setisLoading(false);
        }, 1500);
        return;
      } else if (result.success) {
        localStorage.setItem("email", result.userData.email);
        setTimeout(() => {
          setisLoading(false);
        }, 300);
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="box">
            <h3>Sign In</h3>
            {serverError && <div id="error-msgs" className="msgs red">{serverError}</div>}
            {errors.email && (
              <div className="msgs red">{errors.email.message}</div>
            )}

            {errors.password && (
              <div className="msgs red">{errors.password.message}</div>
            )}
            <form
              className="sign-form"
              action=""
              onSubmit={handleSubmit(onsubmit)}
            >
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                {...register("email", {
                  required: { value: true, message: "Please Enter Email" },
                })}
              />
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                {...register("password", {
                  required: { value: true, message: "Please Enter password" },
                })}
              />
              <button id="submit_button" type="submit">
                Sign In
                {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
              </button>
            </form>
            <p>
              Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
