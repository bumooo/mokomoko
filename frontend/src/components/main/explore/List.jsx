import React from "react";
import Item from "./Item";

const List = ({ list }) => {
  return (
    <div className="explore-list">
      {list.map((item, i) => (
        <Item {...item} key={`item_${i}`} />
      ))}
    </div>
  );
};

export default List;
