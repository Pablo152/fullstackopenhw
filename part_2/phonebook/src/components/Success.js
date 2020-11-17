import React from "react";

const successStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: 16,
  border: "1px solid green",
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
};

const Success = ({ successMessage }) => {
  if (!successMessage) {
    return null;
  }

  return (
    <div className="success" style={successStyle}>
      <h1>{successMessage}</h1>
    </div>
  );
};

export default Success;
