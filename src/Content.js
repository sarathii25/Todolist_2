import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import "./index.css";
const Content = ({ taskItem, handleCheck, handleDelete }) => {
  return (
    <main>
      {taskItem.length ? (
        <ul>
          {taskItem.map((item) => {
            return (
              <li className="item" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(item.id)}
                ></input>
                <label
                  style={
                    item.checked ? { textDecoration: "line-through" } : null
                  }
                  onDoubleClick={() => handleCheck(item.id)}
                >
                  {item.task}
                </label>
                <FaTrash role="button" onClick={() => handleDelete(item.id)} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p style={{ fontSize: 25, color: "mediumblue", fontWeight: "bold" }}>
          Your Task is Empty !!
        </p>
      )}
    </main>
  );
};

export default Content;
