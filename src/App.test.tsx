import React from 'react';
import ReactDOM from "react-dom";
import SocialNetApp from "./App";

test("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SocialNetApp/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
