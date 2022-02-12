import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// used for log out if token is expired
import EventBus from "../../common/EventBus";

function NavBar(props) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showAdmin, setShowAdmin] = useState(false);

  console.log("Home-current user:" + currentUser);

  useEffect(() => {
    if (currentUser) {
      setShowAdmin(currentUser.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      props.logOut();
    });
  }, [currentUser, props]);

  const handleClick = (e) => {
    let targetEl = e.currentTarget;
    let link = targetEl.getElementsByClassName("nav-link")[0];
    let currentlyActive = Array.from(document.getElementsByClassName("active"));
    currentlyActive.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  };

  const pageUrl =
    window.location.pathname === "" ? "/" : window.location.pathname;
  console.log(pageUrl);

  const activeItem = {
    home: pageUrl === "/" ? " active" : "",
    createAccount: pageUrl === "/createaccount" ? " active" : "",
    login: pageUrl === "/login" ? " active" : "",
    deposit: pageUrl === "/deposit" ? " active" : "",
    withdraw: pageUrl === "/withdraw" ? " active" : "",
    allData: pageUrl === "/alldata" ? " active" : "",
    welcome: pageUrl === "/welcome" ? " active" : "",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="p-3">
        <img src="bank-logo.png" alt="The Bank" width="65px" />
        <a className="navbar-brand brand-text" href="/" title="Home Page">
          The Bank
        </a>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
            <a
              className={"nav-link" + activeItem["home"]}
              href="/"
              title="Home"
              data-toggle="tooltip"
            >
              Home
            </a>
          </li>
          {!currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <a
                className={"nav-link" + activeItem["createAccount"]}
                href="/createaccount"
                title="Create Account"
                data-toggle="tooltip"
              >
                Create Account
              </a>
            </li>
          )}
          {!currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <a
                className={"nav-link" + activeItem["login"]}
                href="/login"
                title="Login"
                data-toggle="tooltip"
              >
                Login
              </a>
            </li>
          )}

          {currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <Link
                to={"/welcome"}
                className={"nav-link" + activeItem["welcome"]}
              >
                My Account
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <a
                className={"nav-link" + activeItem["deposit"]}
                href="/deposit"
                title="Deposit"
                data-toggle="tooltip"
              >
                Deposit
              </a>
            </li>
          )}
          {currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <a
                className={"nav-link" + activeItem["withdraw"]}
                href="/withdraw"
                title="Withdraw"
                data-toggle="tooltip"
              >
                Withdraw
              </a>
            </li>
          )}

          {currentUser && showAdmin && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <a
                className={"nav-link" + activeItem["allData"]}
                href="/alldata"
                title="All Data"
                data-toggle="tooltip"
              >
                All Data
              </a>
            </li>
          )}

          {currentUser && (
            <li className="nav-item px-4" onClick={props.logOut}>
              <a
                className={"nav-link"}
                href="/login"
                title="logout"
                data-toggle="tooltip"
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;