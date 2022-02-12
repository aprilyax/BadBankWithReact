import React, { useState, useEffect, useLayoutEffect } from "react";
import Card from "../Card";
import AccountBalanceForm from "./AccountBalanceForm";
import EventBus from "../../common/EventBus";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";

function Withdraw(props) {
  const [validTransaction, setValidTransaction] = useState(false);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);
  const WITHDRAW = "Withdraw";

  useLayoutEffect(() => {
    if (currentUser) {
      UserService.getUserBalance(currentUser.id).then(
        (response) => {
          console.log("balance: " + response.data.balance);
          setBalance(response.data.balance);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("error: " + resMessage);
          //setStatus(resMessage);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
  }, [currentUser]);

  const validateWithdraw = (event) => {
    let amt = event.target.value;
    //console.log("event: " + amt);
    if (amt !== "" && (Number(amt) <= 0 || amt === "-")) {
      setStatus("Error: Invalid amount");
      setIsSuccess(false);
      return setValidTransaction(false);
    }

    if (amt !== "" && amt !== "-" && !Number(amt)) {
      setStatus("Error: Please introduce numbers only");
      setIsSuccess(false);
      return setValidTransaction(false);
    }

    if (amt === "") {
      return setValidTransaction(false);
    }

    //setStatus("");
    setValidTransaction(true);
    setAmount(Number(amt));
  };

  useEffect(() => {
    //(`Called useEffect Withdraw`);
    let isMounted = true;
    if (status !== "") {
      //console.log(`Called useEffect`);
      setTimeout(() => {
        if (isMounted) setStatus("");
      }, 3000);
    }

    return () => (isMounted = false);
  });

  const handleSubmit = (event) => {
    if (amount > balance) {
      setStatus(
        `Error: You cannot withdraw more than ${balance.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )}`
      );
      setIsSuccess(false);
      return setValidTransaction(false);
    }
    let newBalance = balance - amount;
    console.log("newBalance: " + newBalance);
    UserService.updateUserBalance(
      currentUser.id,
      amount,
      newBalance,
      WITHDRAW
    ).then(
      (response) => {
        console.log("response: " + response.message);
        setBalance(newBalance);
        setStatus(response.message);
        setValidTransaction(false);
        setIsSuccess(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("error: " + resMessage);
        setStatus(resMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    event.preventDefault();
  };

  const accountWithdrawComponent = (
    <AccountBalanceForm
      label="Withdraw"
      total={balance}
      validateTransaction={validateWithdraw}
      handleSubmit={handleSubmit}
      validTransaction={validTransaction}
    />
  );

  return (
    <>
      {isLoggedIn ? (
        <Card
          header="Withdraw"
          className="card brand-centered brand-margin-top"
          maxWidth="40rem"
          status={status}
          successFlag={isSuccess}
          body={accountWithdrawComponent}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Withdraw;