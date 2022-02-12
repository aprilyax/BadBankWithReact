import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card";
import { MDBDataTableV5 } from "mdbreact";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

function AllData() {
  const [usersList, setUsersList] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const columns = [
    {
      label: "Acct #",
      field: "acct",
      width: 150,
    },
    {
      label: "First Name",
      field: "firstName",
      width: 150,
    },
    {
      label: "Last Name",
      field: "lastName",
      width: 150,
    },
    {
      label: "Email",
      field: "email",
      width: 150,
    },
    {
      label: "Role",
      field: "role",
      width: 150,
    },
  ];

  useEffect(() => {
    //fetch all accounts
    if (currentUser) {
      UserService.getAllUsers(currentUser.id).then(
        (response) => {
          console.log("...UserService.getAllUsers...");
          console.log(response.data.users);
          setUsersList(response.data.users);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.error("error: " + resMessage);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
  }, []);

  function buildRows() {
    let tempRows = [];
    if (usersList) {
      for (const user of usersList) {
        let t = {
          acct: user.acct,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.roles,
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
          header="All Data"
          className="card brand-centered brand-margin-top"
          maxWidth="50rem"
          body={
            <>
              <div>
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
            </>
          }
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default AllData;