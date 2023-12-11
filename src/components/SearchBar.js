import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const SearchBar = ({ onSearch }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const search = (
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      size="lg"
      style={{ color: "#ffffff" }}
    />
  );
  const handleInputChange = (e) => {
    setsearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Desired Location"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">{search}</button>
      </form>
    </div>
  );
};

export default SearchBar;
