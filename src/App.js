import React from "react";
import "./App.css";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default App;
