import React from "react";
import CurrencyFormat from "react-currency-format";

function AccountBalanceForm(props) {
  return (
    <>
      <div className="balance-container">
        <div className="balance-title">
          <h5>Balance: </h5>
        </div>
        <div className="balance-amount">
          <h5>
            <label id="amtBalance" >
              <CurrencyFormat
                value={props.total.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </label>
          </h5>
        </div>
      </div>
      <br />
      <div className="balance-container">
        <div className="label-title">
          <label htmlFor={`amt${props.label}`}> {props.label} Amount:</label>
        </div>
        <div className="amount-container">
          <input
            id={`amt${props.label}`}
            placeholder="0"
            className="form-control amount-input"
            onChange={props.validateTransaction}
          ></input>
        </div>
      </div>
      <br />
      <div className="container my-3">
        <div className="col-md-12 text-center">
          <button
            type="submit"
            className="btn brand-button"
            onClick={props.handleSubmit}
            disabled={!props.validTransaction}
          >
            Submit {props.label}
          </button>
        </div>
      </div>
    </>
  );
}

export default AccountBalanceForm;