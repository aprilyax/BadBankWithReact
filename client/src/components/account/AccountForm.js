import React from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import range from "lodash/range";

import "react-datepicker/dist/react-datepicker.css";

function AccountForm(props) {
  const years = range(1930, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      {props.isNewAccount && (
        <>
          First Name: <br />
          <input
            type="input"
            className="form-control"
            id="firstName"
            placeholder="First Name"
            value={props.firstName}
            onChange={props.handleFirstNameChange}
          />
          <br />
          Last Name: <br />
          <input
            type="input"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
            value={props.lastName}
            onChange={props.handleLastNameChange}
          />
          <br />
          Date of Birth: <br />
          <DatePicker
            className="form-control"
            placeholderText="Date of Birth"
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
            selected={props.dob}
            onChange={props.handleDOBChange}
          />
          <br />
          <br />
        </>
      )}
      Email Address: <br />
      <input
        type="input"
        className="form-control"
        id="email"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleEmailChange}
      />
      <br />
      Password: <br />
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter password"
        value={props.password}
        onChange={props.handlePasswordChange}
      />
      <br />
      <div className="container my-3 bg-light">
        <div className="col-md-12 text-center">
          <button
            type="submit"
            className="btn brand-button"
            onClick={props.handleSubmit}
            disabled={props.isDisabled}
          >
            {props.label}
          </button>
          <br />
        </div>
      </div>
    </>
  );
}

export default AccountForm;