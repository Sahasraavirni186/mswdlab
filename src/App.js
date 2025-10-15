import React, { useState } from "react";
import ColorChild from "./ColorChild";
import BookList from "./BookList";

function App() {
  const [color, setColor] = useState("blue");

  const changeColor = () => {
    setColor(color === "blue" ? "red" : "blue");
  };

  return (
    <div>
      <h1>Color and Book App</h1>
      <ColorChild color={color} onChangeColor={changeColor} />
      <BookList />
    </div>
  );
}

export default App;

