import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { MDBDataTableV5 } from "mdbreact";

const Welcome = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);
  const [transList, setTransList] = useState([]);
  const columns = [
    {
      label: "Trans Number",
      field: "tranNumber",
      width: 150,
    },
    {
      label: "Trans Type",
      field: "tranType",
      width: 150,
    },
    {
      label: "Amount",
      field: "amount",
      width: 150,
    },
    {
      label: "Date",
      field: "date",
      width: 150,
    },
    {
      label: "Time",
      field: "time",
      width: 150,
    },
  ];

  useEffect(() => {
    if (currentUser) {
      UserService.getUserBalance(currentUser.id).then(
        (response) => {
          //console.log("balance: " + response.data.balance);
          setBalance(response.data.balance);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.error("error: " + resMessage);
          //setStatus(resMessage);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      UserService.getUserTrans(currentUser.id).then(
        (response) => {
          //console.log("transactions: " + response.data.transactions);
          setTransList(response.data.transactions);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.error("error: " + resMessage);
          //setStatus(resMessage);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
  }, []);

  function buildRows() {
    let tempRows = [];
    if (transList) {
      for (const transaction of transList) {
        let t = {
          tranNumber: transaction.tranNumber,
          tranType: transaction.tranType,
          amount: transaction.amount,
          date: new Date(transaction.createdDate).toLocaleDateString("en-US"),
          time: new Date(transaction.createdDate).toLocaleTimeString(),
        };
        tempRows.push(t);
      }
    }
    return tempRows;
  }
  let rows = buildRows();
  return (
    <>
      {currentUser ? (
        <Card
          header="Welcome"
          className="card brand-centered brand-margin-top"
          maxWidth="60rem"
          body={
            <>
              <div className="container bottom-border">
                <div className="row">
                  <div className="col">
                    <h4>
                      {currentUser.firstName} {currentUser.lastName}
                    </h4>
                  </div>
                  <div className="col"></div>
                  <div className="col">
                    <h5>
                      Account Balance:{" "}
                      <CurrencyFormat
                        value={balance.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <br />
                </div>
              </div>
              <br />
              <div className="container">
                <div className="row">
                  <h6>
                    <FontAwesomeIcon icon={solid.faReceipt} size="lg" /> Recent
                    Transactions
                  </h6>
                </div>
                <div className="row">
                  <MDBDataTableV5
                    hover
                    striped
                    searchTop
                    searchBottom={false}
                    entriesOptions={[5, 10, 15]} //drop down for num records per page
                    entries={5} //entries per page
                    sorting={false}
                    pagesAmount={5}
                    paginationLabel={["Previous", "Next"]}
                    data={{ columns, rows }}
                  />
                </div>
              </div>
            </>
          }
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Welcome;