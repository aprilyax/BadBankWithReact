import React from "react";

import Card from "./Card";
function Home() {
  return (
    <div id="home" className="home-background">
      <div className="center">
        <Card
          className="card mb-3"
          maxWidth="26rem"
          txtcolor="black"
          header="Bank"
          title="Welcome to The Bank"
          text="Use the links above to login or create a new account."
          body={<img src="bank-logo.png" className="img-fluid" alt="Logo" />}
        />
      </div>
    </div>
  );
}

export default Home;