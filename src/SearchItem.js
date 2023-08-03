import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <div>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          autoFocus
          placeholder="Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default SearchItem;
