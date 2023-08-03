import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa6";

const AddNewItem = ({ handleSubmit, setNewItem, newItem }) => {
  const inputRef = useRef();
  return (
    <div>
      <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="additem">Add Item</label>
        <input
          type="text"
          ref={inputRef}
          placeholder="Add Item"
          id="additem"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        ></input>
        <button onClick={() => inputRef.current.focus()}>
          <FaPlus />
        </button>
      </form>
    </div>
  );
};

export default AddNewItem;
