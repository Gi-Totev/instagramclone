import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import FirebaseContext from "../context/firebase";
import { doesUserNameExist } from "../services/firebase";
import * as ROUTES from "../constants/routes";

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userNameExists = await doesUserNameExist(username);
    if (!userNameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        console.log(createdUserResult);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername("");
        setFullname("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("This username is already in use. Please try another");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram Clone";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="App in phone"
          className="max-w-full"
        ></img>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="images/logo.png"
              alt="logo"
              className="mt-2 mb-4 w-6/12"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST">
            <input
              autoComplete="off"
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username || ""}
            />
            <input
              autoComplete="off"
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullname(target.value)}
              value={fullname || ""}
            />
            <input
              autoComplete="off"
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress || ""}
            />
            <input
              autoComplete="off"
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password || ""}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center item-center flex-col w-full bg-white p-4 border-gray-primary rounded">
          <p className="text-sm">
            Already have an account? &nbsp;
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
