import React from "react";

const Search = (props) => {
  return (
    <div>
      <h2>Search Countries</h2>
      <input onChange={props.onChange}/>
    </div>
  );
};

export default Search;
