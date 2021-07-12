import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar/Avatar";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram Clone Logo">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  Dashboard
                </Link>
                <button
                  className="mx-5"
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  Log Out
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <Avatar username={user.displayName} variant="sm" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm text-white rounded w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="font-bold text-sm text-blue-medium rounded w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
