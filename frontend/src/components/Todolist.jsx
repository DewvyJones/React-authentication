import React from "react";

const Todolist = ({ item }) => {
  return (
    <>
      <tr>
        <td>{item.title}</td>
        <td>{item.deadline}</td>
      </tr>
    </>
  );
};

export default Todolist;
