import React from "react";

const ColorChild = ({ color, onChangeColor }) => {
  return (
    <div>
      <p>The selected color is {color}</p>
      <button onClick={onChangeColor}>Change Color</button>
    </div>
  );
};

export default ColorChild;