import React from "react";
import Navigation from "../../components/navbar/Navigation";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default AuthLayout;
