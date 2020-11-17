import React from "react";

const errorStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: 16,
  border: "1px solid red",
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
};

const Error = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div className="success" style={errorStyle}>
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default Error;
