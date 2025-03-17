import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { useNavigate } from "react-router-dom";
import { Notification } from "@progress/kendo-react-notification";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (notifStatus) {
      const timer = setTimeout(() => {
        setNotifStatus(false);
        navigate("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifStatus, navigate]);

  const loginUser = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(validUser));
      setNotifStatus(true); // Show success message
    } else {
      setError("Email or password incorrect.");
    }
  };

  return (
    <div id="login">
      {/* Notification */}
      {error && (
        <Notification closable={true} type={{ style: "error", icon: true }}>
          {error}
        </Notification>
      )}
      {notifStatus && (
        <Notification closable={true} type={{ style: "success", icon: true }}>
          Login Successful
        </Notification>
      )}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://lh3.googleusercontent.com/sD8t1fg9YFeCS2dzNITeosrp3i86wHs9CuZPZQWs5M_zrmqpvc0G7LX4sXKg4EJhIPiRdgQkvpPAC8gkQw=s265-w265-h265"
            className="mx-auto h-24 w-auto"
          />
          {/* <h4 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            D'Villa
          </h4> */}
          <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Login form */}
          <form onSubmit={loginUser}>
            <div>
              <Label className="font-medium" editorId="email">
                Email&nbsp;
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label className="font-medium" editorId="password">
                  Password&nbsp;
                </Label>

                <div className="text-xs">
                  <Link
                    to={"#"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 mb-4">
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              to={"/register"}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
