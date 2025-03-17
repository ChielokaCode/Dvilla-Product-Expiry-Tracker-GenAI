import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { useNavigate } from "react-router-dom";
import { Notification } from "@progress/kendo-react-notification";
import { Button } from "@progress/kendo-react-buttons";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifStatus, setNotifStatus] = useState(false);
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
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

  const registerUser = (e) => {
    e.preventDefault();
    setError("");
    try {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email already exists
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        setError("User with this email already exists!");
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      // Add new user
      users.push({
        firstName,
        lastName,
        email,
        password,
        country,
        dob,
        gender,
        phoneNo,
      });

      // Store back to local storage
      localStorage.setItem("users", JSON.stringify(users));

      // Show notification
      setNotifStatus(true);

      setTimeout(() => {
        navigate("/");
      }, 3000); // Redirect after 3 seconds
    } catch (e) {
      setError("Error while Registering user");
    }
  };

  const sex = ["Male", "Female"];

  return (
    <div id="register">
      {/* Nofitication  */}
      {error && (
        <Notification closable={true} type={{ style: "error", icon: true }}>
          {error}
        </Notification>
      )}
      {notifStatus && (
        <Notification closable={true} type={{ style: "success", icon: true }}>
          Registration Successful
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
            Register
          </h2>
        </div>
        {/* Form Register */}
        <form onSubmit={registerUser}>
          <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* First Name */}
            <div>
              <Label className="font-medium" editorId="firstName">
                First Name&nbsp;
              </Label>
              <div className="mt-2">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <div>
                <Label className="font-medium" editorId="lastName">
                  Last Name&nbsp;
                </Label>
                <div className="mt-2">
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label className="font-medium" editorId="email">
                  Email&nbsp;
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <Label className="font-medium" editorId="country">
                  Country&nbsp;
                </Label>
                <div className="mt-2">
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <Label className="font-medium" editorId="dob">
                  Date of Birth&nbsp;
                </Label>
                <div className="mt-2">
                  <DatePicker
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>
              </div>

              {/* Gender {Dropdown} */}
              <div>
                <Label className="font-medium" editorId="gender">
                  Gender&nbsp;
                </Label>
                <div className="mt-2">
                  <DropDownList
                    style={{
                      width: "390px",
                    }}
                    data={sex}
                    value={gender}
                    defaultValue="Male"
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <Label className="font-medium" editorId="phoneNo">
                  Phone number&nbsp;
                </Label>
                <div className="mt-2">
                  <Input
                    id="phoneNo"
                    name="phoneNo"
                    type="text"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label className="font-medium" editorId="password">
                  Password&nbsp;
                </Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label className="font-medium" editorId="confirmPassword">
                  Confirm Password&nbsp;
                </Label>
                <div className="mt-2 mb-4">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  themeColor={"info"}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </Button>
              </div>

              {/* Signup Link */}
              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <Link
                  to={"/"}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
