import React from "react";
import { useHistory } from "react-router-dom";

const Forbiden = () => {
  const history = useHistory();
  return (
    <div>
      This page is forbidden! Please log in!
      <button onClick={() => history.push("/")}>Log in</button>
    </div>
  );
};

export default Forbiden;
