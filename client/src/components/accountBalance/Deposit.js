import React, { useState, useEffect } from "react";
import Card from "../Card";
import AccountBalanceForm from "./AccountBalanceForm";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

function Deposit() {
  const [validTransaction, setValidTransaction] = useState(false);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);
  const DEPOSIT = "Deposit";

  useEffect(() => {
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

  const validateDeposit = (event) => {
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

    setValidTransaction(true);
    setAmount(Number(amt));
  };

  useEffect(() => {
    //console.log(`Called useEffect Deposit`);
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
    let newBalance = balance + amount;
    console.log("newBalance: " + newBalance);
    UserService.updateUserBalance(
      currentUser.id,
      amount,
      newBalance,
      DEPOSIT
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

  const accountDepositComponent = (
    <AccountBalanceForm
      label="Deposit"
      total={balance}
      validateTransaction={validateDeposit}
      handleSubmit={handleSubmit}
      validTransaction={validTransaction}
    />
  );
  return (
    <>
      {isLoggedIn ? (
        <Card
          header="Deposit"
          className="card brand-centered brand-margin-top"
          maxWidth="40rem"
          status={status}
          successFlag={isSuccess}
          body={accountDepositComponent}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Deposit;