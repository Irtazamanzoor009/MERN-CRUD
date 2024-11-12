import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginStyle.css";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [serverError, setserverError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    setisLoading(true);
    setserverError("");
    try {
      const response = await fetch("https://mern-crud-eight-xi.vercel.app/user/signup", {
      // const response = await fetch("http://localhost:4001/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!result.success) {
        setserverError(result.message);
        setisLoading(false);
        setTimeout(() => {
          setserverError("");
        }, 1000);
        return;
      }

      setTimeout(() => {
        setisLoading(false);
      }, 300);

      setshowSuccessMessage(true);
      setTimeout(() => {
        setshowSuccessMessage(false);
        reset();
      }, 1000);
    } catch (error) {
      setserverError("Internal Server Error: ", error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="box">
            <h3>Sign Up</h3>
            {showSuccessMessage && (
              <div className="msgs green">User Signed Up Successfully</div>
            )}
            {serverError && <div className="msgs red">{serverError}</div>}
            {errors.email && (
              <div className="msgs red">{errors.email.message}</div>
            )}

            {errors.password && (
              <div className="msgs red">{errors.password.message}</div>
            )}
            {errors.username && (
              <div className="msgs red">{errors.username.message}</div>
            )}
            <form
              className="sign-form"
              action=""
              onSubmit={handleSubmit(onsubmit)}
            >
              <input
                type="text"
                placeholder="Enter UserName"
                {...register("username", {
                  required: { value: true, message: "Please Enter Username" },
                })}
              />
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: { value: true, message: "Please Enter Email" },
                })}
              />
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: { value: true, message: "Please Enter password" },
                  minLength: {
                    value: 5,
                    message: "Password Length must be greater then 5",
                  },
                })}
              />
              <button type="submit" disabled={showSuccessMessage}>
                Sign Up{" "}
                {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
              </button>
            </form>
            <p>
              Already have an account? <NavLink to="/signin">Sign In</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
