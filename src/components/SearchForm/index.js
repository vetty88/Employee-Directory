import React from "react";
import "./style.css";

// Using the dataList element we can create autofill suggestions based on the props.users array
function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="user">user Name:</label>
        <input
          value={props.search}
          onChange={props.handleInputChange}
          name="user"
          list="users"
          type="text"
          className="form-control"
          placeholder="Type in a User user to begin"
          id="user"
        />
        <dataList id="users">
          {props.users.map(user => (
            <option value={user} key={user} />
          ))}
        </dataList>
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
