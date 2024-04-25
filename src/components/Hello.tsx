import React from "react";
import "./Hello.css";

// Define the props type for the Hello component
type HelloProps = {
  person: string;
};

// Functional component Hello with person prop
const Hello: React.FC<HelloProps> = ({ person }) => {
  return <h1 className="hello-greeting">Hello {person}</h1>;
};

export default Hello;
